const Terms = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <h1>Terms and Conditions</h1>
        <p><strong>Last updated: {new Date().toLocaleDateString()}</strong></p>

        <p>These Terms and Conditions ("Terms") govern your use of our platform and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By using our platform, you affirm that you are at least 18 years of age or possess legal parental or guardian consent, and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms.</p>

        <h2>2. User Account</h2>
        <ul>
            <li>You must provide accurate and complete registration information any time you register to use any of the services.</li>
            <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.</li>
        </ul>

        <h2>3. User Conduct</h2>
        <p>You agree not to use our platform to:</p>
        <ul>
            <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable;</li>
            <li>Impersonate any person or entity, including, but not limited to, any platform official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
            <li>Harvest or collect email addresses or other contact information of other users from the service by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;</li>
            <li>Use the service in any unlawful manner or in any other manner that could damage, disable, overburden or impair the service or interfere with any other party's use and enjoyment of the service;</li>
        </ul>

        <h2>4. Content</h2>
        <p>You understand that all information, data, text, software, music, sound, photographs, graphics, video, messages, tags, or other materials ("Content"), whether publicly posted or privately transmitted, are the sole responsibility of the person from which such Content originated. This means that you, and not our platform, are entirely responsible for all Content that you upload, post, email, transmit or otherwise make available via the service.</p>

        <h2>5. Intellectual Property</h2>
        <p>This platform website and its original content, features, and functionality are owned by this platform and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

        <h2>6. Limitation of Liability</h2>
        <p>In no event shall this platform, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:</p>
        <ul>
            <li>Errors, mistakes, or inaccuracies of content;</li>
            <li>Personal injury or property damage, of any nature whatsoever, resulting from your access to and use of our service;</li>
            <li>Any unauthorized access to or use of our secure servers and/or any and all personal information stored therein;</li>
            <li>Any interruption or cessation of transmission to or from our service;</li>
            <li>Any bugs, viruses, trojan horses, or the like which may be transmitted to or through our service by any third party;</li>
        </ul>

        <h2>7. Termination</h2>
        <p>We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.</p>

        <h2>8. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of [Insert Your Jurisdiction], without regard to its conflict of law provisions.</p>

        <h2>9. Changes to Terms</h2>
        <p>This platform reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the service following the posting of changes will mean that you accept and agree to the changes.</p>

        <h2>10. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us.</p>

        <p>By using this platform, you consent to these Terms and Conditions. If you do not agree with these terms, please do not use our services.</p>
      </div>
    </div>
  );
};

export default Terms;