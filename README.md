# Chordsandweapons Middleware

This is the Middleware between the Shopify Backend and Angular Frontend of the Chordsandweapons online record store -
implementing an Express API hosted as a Firebase Cloud Function.

                   ┌────────────────────────────┐
                   │     Shopify Admin + API    │
                   │  (products, metafields)    │
                   └──────────────────▲─────────┘
                                      │
                   (Secure API calls) │
                                      │
     ┌───────────┐     (Resolved)     ▼
     │   Redis   │◄───────Cache───────┐
     └───────────┘                    │
           ▲                          │
           │      ┌─────────────────────────────┐
           └─────►│ Firebase Cloud Functions    │
                  │ (Middleware + Logic Layer)  │
                  └────────────┬────────────────┘
                               │
              HTTPS API Calls  ▼
          ┌─────────────────────────────────────┐
          │    Angular 20 Frontend Storefront   │
          │ (hosted via Firebase or elsewhere)  │
          └────────────────┬────────────────────┘
                           │
                           ▼
                 Customer Web Browser
