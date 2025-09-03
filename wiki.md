# Project Summary
The "Plain" project is an innovative Android mobile application designed to enhance mental health by analyzing and managing user activity across various installed apps. It provides insights into app usage, promotes effective screen time management, and supports overall mental wellness through AI-driven analytics. Key features include personalized notifications, comprehensive usage reports, flexible subscription plans, and secure payment integration, all aimed at fostering healthier digital habits and proactive self-care.

# Project Module Description
- **User Monitoring**: Enables users to track their app usage.
- **Notification System**: Sends alerts at 30%, 60%, and 90% usage thresholds.
- **App Management**: Allows users to manage monitored apps, set daily limits, and disable apps upon reaching usage limits.
- **Usage Analytics**: Provides detailed reports on app usage with personalized suggestions for improvement.
- **AI Integration**: Users can select AI agents for tailored insights and email reports.
- **Subscription Plans**: Offers monthly and yearly payment options, including a 7-day free trial.
- **Payment Security**: Features enhanced payment integration with IntaSend for secure transactions.

# Directory Tree
```
uploads/
└── Plain/
    ├── plain_class_diagram.mermaid   # Class diagram for application architecture
    ├── plain_prd.md                   # Product Requirements Document
    ├── plain_sequence_diagram.mermaid  # Sequence diagram illustrating interactions
    ├── plain_system_design.md           # System design documentation
    ├── shadcn-ui.zip                   # UI components package
    └── wiki.md                         # Project wiki documentation
src/
├── components/                        # Contains React components
│   ├── auth/                          # Authentication components
│   ├── apps/                          # App management components
│   ├── ai/                            # AI agent components
│   ├── subscription/                  # Subscription management components
│   ├── Dashboard.jsx                  # Main dashboard component
│   ├── Header.jsx                     # Header component
│   └── Sidebar.jsx                    # Sidebar navigation component
├── data/                              # Mock data for testing
├── utils/                             # Utility functions including payment integration
└── App.jsx                            # Main application entry point
```

# File Description Inventory
- **plain_class_diagram.mermaid**: Visual representation of the application's class structure.
- **plain_prd.md**: Document detailing the product requirements for Plain.
- **plain_sequence_diagram.mermaid**: Sequence diagram showing the flow of operations within the application.
- **plain_system_design.md**: Comprehensive design document outlining the system architecture.
- **shadcn-ui.zip**: Compressed file containing UI components for the application.
- **wiki.md**: Main wiki documentation for the project.
- **Subscription.jsx**: Component for managing user subscriptions and payments, integrated with IntaSend for secure payment assurance.
- **PaymentEnvironmentInfo.jsx**: Component displaying payment environment configuration and suggested webhook URL.
- **paymentIntegration.js**: Utility for managing IntaSend payment integration, now includes secure handling of API keys and environment configurations.

# Technology Stack
- **Android SDK**: For native app development.
- **Java/Kotlin**: Programming languages for Android development.
- **Firebase**: For user authentication and analytics.
- **IntaSend**: Payment gateway integration for subscription management.
- **Supabase**: Backend for real-time authentication and user data management.
- **Mermaid**: For diagram generation in documentation.

# Usage
To set up the project, follow these steps:
1. Install necessary dependencies using your preferred package manager.
2. Build the project using the Android build tools.
3. Run the application on an Android device or emulator.
