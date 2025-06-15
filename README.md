# Chordsandweapons Middleware

## Why Firebase Cloud Functions Is a Great Fit for Your Middleware

🔐 1. Secure & Private API Layer
* Functions run server-side, so your Shopify Admin/Storefront tokens are kept secret.
* You can easily enforce Firebase Auth on selected routes.
* Hosting your middleware behind functions.https.onRequest() + Firebase Hosting proxy keeps it secure and tightly coupled.

🔁 2. Shopify Integration Works Great
* Firebase Functions can securely call Shopify’s Admin or Storefront APIs.
* Use .env or Firebase functions:config:set to store API secrets safely.

💡 3. Built-in Support for Audio URL Signing / Session Logic
* Signed preview URLs (e.g., to Cloudinary, S3, or Firebase Storage) can be dynamically generated per request.
* You can gate audio previews based on:
  * Firebase Auth status
  * Guest session cookies
  * Product metafields (stored in Shopify or Firestore)

🧩 4. Developer Efficiency
* No server maintenance, autoscaling built-in.
* You can deploy both:
  * The Angular frontend (with firebase deploy --only hosting)
  * The middleware backend (firebase deploy --only functions)

💸 5. Cost
* Firebase’s free Spark plan includes:
  * 125K invocations/month for Cloud Functions
  * Free Firebase Hosting
  * Free Firebase Auth

You likely won’t exceed this in early stages unless you're streaming tons of audio files (which you'd host externally anyway).