import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | SlimShot AI',
  description: 'Privacy Policy for SlimShot AI mobile application.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      {/* Floating Header */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto glass rounded-full px-6 py-3 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/icon.png" alt="SlimShot Logo" width={32} height={32} className="w-8 h-8 rounded-full shadow-lg shadow-indigo-500/20" />
            <span className="font-bold tracking-tight text-lg">SlimShot</span>
          </Link>
        </header>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-8">
          Privacy <span className="text-gradient-primary">Policy</span>
        </h1>
        
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <div className="glass-subtle p-6 rounded-2xl border border-slate-700 space-y-4 shadow-xl shadow-black/20">
            <p className="text-sm font-medium text-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            <p>
              Welcome to SlimShotAI. We take your privacy extremely seriously. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when you use the SlimShotAI mobile application ("Slimshot Ai").
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Core Functionality & On-Device Processing</h2>
            <p>
              SlimShotAI is a local media utility designed to empower you with tools to compress videos and photos, convert media formats, and strip privacy-sensitive metadata (such as EXIF data, GPS coordinates, device information, and timestamps) from your images.
            </p>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mt-4 shadow-lg shadow-primary/5">
              <p className="font-medium text-primary">
                <strong>100% On-Device Processing:</strong> The most critical aspect of our privacy commitment is that ALL processing happens locally on your device.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. No Cloud Uploads</h2>
            <p>
              Because all processing is performed on-device using our custom engines, the App <strong>does NOT upload, transmit, store, or share</strong> your photos, videos, or any media files to our servers, external servers, or any third parties. We do not have access to your media files at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Permissions Required</h2>
            <p>
              To provide its core functionality, SlimShotAI requires specific permissions. We only request permissions that are absolutely necessary:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Storage/Gallery Access (Photos and Videos):</strong> We require this permission strictly to allow you to select the files you wish to process and to save the processed (compressed, converted, or stripped) files back to your device's local storage. This access is never used to scan or upload your library.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Collection</h2>
            <p>
              SlimShotAI <strong>does not collect any personally identifiable information (PII)</strong> from its users.
            </p>
            <p>
              To help us improve the App's stability and performance, we may collect basic, anonymous, non-identifying analytics and crash logs. This data only includes generalized information such as device model, operating system version, and crash instances. <strong>Your media files and personal data are strictly off-limits and are never included in these logs.</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Children's Privacy</h2>
            <p>
              The App is not directed at children under the age of 13. We do not knowingly collect any personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <a href="mailto:Support@techfamz.com" className="inline-block mt-2 px-6 py-3 glass-subtle rounded-lg border border-slate-700 text-slate-50 font-medium hover:bg-slate-800/50 transition-colors">
              Support@techfamz.com
            </a>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-lg mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-center items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SlimShot AI. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
