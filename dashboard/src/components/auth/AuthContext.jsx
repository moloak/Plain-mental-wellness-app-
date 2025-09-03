import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://qouhcfixofwdoixkaxom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdWhjZml4b2Z3ZG9peGtheG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDE3MjAsImV4cCI6MjA3MjMxNzcyMH0.KWEJX-rq_aWeGkeveGsrnbFRiRZ4651aqKmJQFOKr-w';

const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          // Get user profile from database
          const { data: profile, error: profileError } = await supabase
            .from('app_fdecfd0ddc_users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError);
          }

          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile?.name || session.user.user_metadata?.name || 'User',
            phone: profile?.phone || session.user.user_metadata?.phone || '',
            subscriptionPlan: profile?.subscription_plan || 'trial',
            trialStartDate: profile?.trial_start_date || new Date().toISOString().split('T')[0],
            aiAgent: profile?.ai_agent || 'dan',
            subscriptionStartDate: profile?.subscription_start_date,
            paymentReference: profile?.payment_reference
          });
        }
      } catch (error) {
        console.error('Session check error:', error);
        setError('Failed to check authentication status');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Get or create user profile
        const { data: profile, error: profileError } = await supabase
          .from('app_fdecfd0ddc_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const newProfile = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || 'User',
            phone: session.user.user_metadata?.phone || '',
            subscription_plan: 'trial',
            trial_start_date: new Date().toISOString().split('T')[0],
            ai_agent: 'dan',
            created_at: new Date().toISOString()
          };

          const { error: insertError } = await supabase
            .from('app_fdecfd0ddc_users')
            .insert([newProfile]);

          if (insertError) {
            console.error('Profile creation error:', insertError);
          }

          setUser({
            id: session.user.id,
            email: session.user.email,
            name: newProfile.name,
            phone: newProfile.phone,
            subscriptionPlan: newProfile.subscription_plan,
            trialStartDate: newProfile.trial_start_date,
            aiAgent: newProfile.ai_agent
          });
        } else if (!profileError) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: profile.name,
            phone: profile.phone,
            subscriptionPlan: profile.subscription_plan,
            trialStartDate: profile.trial_start_date,
            aiAgent: profile.ai_agent,
            subscriptionStartDate: profile.subscription_start_date,
            paymentReference: profile.payment_reference
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name, aiAgent = 'dan') => {
    try {
      setError('');
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            ai_agent: aiAgent
          }
        }
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    }
  };

  const updateUser = async (updates) => {
    if (!user) return;

    try {
      // Update in database
      const { error } = await supabase
        .from('app_fdecfd0ddc_users')
        .update({
          name: updates.name || user.name,
          phone: updates.phone || user.phone,
          subscription_plan: updates.subscriptionPlan || user.subscriptionPlan,
          subscription_start_date: updates.subscriptionStartDate || user.subscriptionStartDate,
          payment_reference: updates.paymentReference || user.paymentReference,
          ai_agent: updates.aiAgent || user.aiAgent
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setUser(prev => ({
        ...prev,
        ...updates
      }));
    } catch (error) {
      console.error('Update user error:', error);
      setError(error.message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    supabase
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};