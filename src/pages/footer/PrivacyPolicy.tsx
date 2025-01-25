const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h1>Privacy Policy</h1>
          
          <p>Thank you for using our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. We are committed to protecting your privacy and ensuring the security of your personal information.</p>

          <h2>1. Information We Collect</h2>
          
          <h3>a. Information You Provide</h3>
          <ul>
              <li><strong>Account Information:</strong> When you create an account, we collect your username, email address, and possibly a profile picture or other personal details you choose to share.</li>
              <li><strong>User Content:</strong> Posts, comments, messages, and other content you upload or share on the platform.</li>
              <li><strong>Profile Information:</strong> Any additional information you add to your profile, such as interests, location, or bio.</li>
          </ul>

          <h3>b. Automatically Collected Information</h3>
          <ul>
              <li><strong>Usage Data:</strong> We log information about how you interact with our services, including which pages you visit, how long you spend on each page, and what features you use.</li>
              <li><strong>Device Information:</strong> We collect data about the device you use to access our service, including device type, operating system, browser type, unique device identifiers, and network information.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies and other tracking technologies to enhance your experience, analyze trends, administer the website, track users' movements around the site, and to gather demographic information about our user base as a whole.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
              <li>To Provide and Maintain Our Services: Including account management, content sharing, and communication features.</li>
              <li>To Improve and Personalize Your Experience: We use data to tailor content, improve user interface, and enhance service functionality.</li>
              <li>For Security and Fraud Prevention: To protect our users, our platform, and to prevent misuse.</li>
              <li>For Communication: We may send you service-related emails (e.g., password reset, account notifications), marketing emails if you opt-in, or updates about our services.</li>
              <li>For Legal Compliance: To respond to legal requests or to prevent harm.</li>
          </ul>

          <h2>3. Children's Privacy (COPPA Compliance)</h2>
          <p>Our platform is not directed to children under 13. We do not knowingly collect personal information from children under 13 without parental consent. If we learn we have collected personal information from a child under 13, we will take steps to delete such information from our servers.</p>
          <ul>
              <li><strong>Parental Consent:</strong> If a child under 13 wishes to use our services, we require verifiable parental consent before collecting any personal information.</li>
              <li><strong>Parental Control:</strong> Parents can review, change, or delete their child's personal information, and refuse further collection or use of the child's information.</li>
              <li><strong>Notification of Changes:</strong> If we make any material changes to how we collect or use children's personal information, we will notify parents by updating this Privacy Policy and providing notice through the service.</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <ul>
              <li>With Consent: We will share your information if you have given us permission to do so.</li>
              <li>For Service Providers: We may share data with third parties who perform services on our behalf, like hosting providers, analytics services, etc., under confidentiality agreements.</li>
              <li>Legal Reasons: We may disclose information to comply with legal obligations, to protect and defend our rights or property, or to protect the personal safety of users or the public.</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We strive to protect your personal information using reasonable security measures. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

          <h2>6. Your Privacy Choices</h2>
          <ul>
              <li><strong>Account Settings:</strong> You can adjust your privacy settings within your account to control what information is shared.</li>
              <li><strong>Access, Update, or Delete:</strong> You can request to access, update, or delete your personal data by contacting us.</li>
              <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications by following the unsubscribe link in the emails or by adjusting your email preferences in your account settings.</li>
          </ul>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>

          <p>By using our platform, you consent to our Privacy Policy. If you do not agree with this policy, please do not use our services. Remember, this policy is subject to change, so check back periodically to review our practices.</p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;