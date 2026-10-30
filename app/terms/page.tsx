import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | SlimShot AI',
  description: 'The terms for using the SlimShot AI mobile app, its account and credits.',
};

// A fixed date: the page says when the terms last changed, not when they were viewed.
const LAST_UPDATED = 'October 30, 2026';

export default function TermsOfService() {
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
          Terms of <span className="text-gradient-primary">Service</span>
        </h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <div className="glass-subtle p-6 rounded-2xl border border-slate-700 space-y-4 shadow-xl shadow-black/20">
            <p className="text-sm font-medium text-foreground">Last updated: {LAST_UPDATED}</p>
            <p>
              These terms are an agreement between you and Techfamz (“we”, “us”), the maker of the SlimShot AI mobile app (“the App”). By using the App, or by creating an account, you agree to them. If you don’t agree, please don’t use the App. How we handle your information is explained in our{' '}
              <Link href="/privacy" className="text-foreground underline underline-offset-4">Privacy Policy</Link>.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Who can use the App</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 to create an account, or older if the law where you live requires it.</li>
              <li>An account is for one person. Keep access to your email and Google account secure, because anyone who can sign in as you can use your account and its credits.</li>
              <li>You need an account only for features that use credits, such as Auto captions. Editing and compressing don’t require one.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Your content</h2>
            <p>
              The videos, photos and sound you work on, and the videos you make with the App, are yours. We don’t claim any ownership of them, and you may use what you make however you like, including commercially, as long as you respect the rights of anything you put into it.
            </p>
            <p>
              You are responsible for having the right to use everything you edit, caption and publish, including music, footage and the people who appear in it. When you use Auto captions, you allow us and our speech-to-text providers to process the sound you upload, only to produce your captions, as the Privacy Policy describes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the App to make or spread content that is illegal, infringes someone else’s rights, or harasses, threatens or exploits anyone, especially children.</li>
              <li>Create several accounts, or use fake or disposable details, to collect free credits or referral rewards more than once.</li>
              <li>Cheat the rewarded ads or referrals, for example with bots, scripts, emulators or click schemes.</li>
              <li>Access our servers other than through the App, get around credit charges or limits, or interfere with or overload our service.</li>
              <li>Copy, modify, resell or reverse engineer the App, except where the law allows it.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Credits</h2>
            <p>Credits let you use certain features, such as Auto captions.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You can get free credits when you set up your account, by watching rewarded ads, through referrals, and by claiming them in the App once a day, a week or a month when we offer it. A claim you miss does not carry over. We set the amounts, how often they can be claimed and the daily limits, and may change or stop them.</li>
              <li>The number of credits a feature costs is set by us and may change. Credits are taken when a job starts and given back automatically if the job fails.</li>
              <li>Credits have <strong>no cash value</strong>. They can’t be sold, transferred to another account or exchanged for money, and they are lost when you delete your account.</li>
              <li>We may correct credits given by mistake, and remove credits gained by breaking these terms.</li>
              <li>If we later offer credits for purchase, the payment will be handled by Google Play under its own terms, and we will update these terms before purchases are offered.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Auto captions</h2>
            <p>
              Captions are produced automatically by speech-recognition technology and can contain mistakes, especially with music, background noise, accents or several people speaking. Please check your captions before you publish. We are not responsible for errors in automatically generated text.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Fonts, music, sound effects and templates</h2>
            <p>
              The fonts, music, sound effects, templates, effects and transitions provided in the App are licensed, not sold, to you. You may use them in videos you make with the App, including videos you publish or share. You may not extract them and use, sell or share them on their own, or as part of another collection. Some items carry their own licence terms, such as fonts under the SIL Open Font License, and those terms also apply. Notices for the open-source software in the App are listed in its Settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Ads</h2>
            <p>
              The App is free to use and is supported by ads from Google. Some ads appear during or after tasks, and some features can be unlocked by watching a rewarded ad. How ads use data is explained in the Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. The App belongs to us</h2>
            <p>
              The App, its design, code, name and logo belong to us or our licensors. We give you a personal, non-exclusive, non-transferable licence to use the App on devices you own or control, under these terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Changes to the App, and suspension</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We may add, change or remove features, change which features use credits, or stop offering a feature or the App, at any time.</li>
              <li>We may suspend or close an account, and remove its credits, if it breaks these terms, abuses the service, or if the law requires it. Where we reasonably can, we will tell you why.</li>
              <li>You can stop using the App whenever you like, and delete your account in the App or on our website, as described in the Privacy Policy.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. No guarantees</h2>
            <p>
              The App is provided “as is” and “as available”. We work hard to make it reliable, but we don’t promise it will always be available, error-free or suitable for a particular purpose, or that exports, compression results or captions will meet your expectations on every device. Keep the original files you care about. The App never changes your originals, but phones and storage can fail.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Limitation of liability</h2>
            <p>
              As far as the law allows, we are not liable for indirect, incidental or consequential losses, or for lost data, content, profits or opportunities, arising from your use of the App. Our total liability for any claim relating to the App is limited to the amount you paid us, if any, in the 12 months before the claim. Nothing in these terms limits any rights you have under consumer protection laws that can’t be excluded.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Governing law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of Nigeria, and disputes are subject to the courts of Nigeria, without taking away any protection the law of the country where you live gives you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Changes to these terms</h2>
            <p>
              We may update these terms as the App changes, and will change the date at the top. If a change is significant, we will make it clear before it takes effect, for example with a notice in the App. If you keep using the App after a change takes effect, you accept the updated terms.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Contact</h2>
            <p>For questions about these terms, email us at:</p>
            <a href="mailto:Support@techfamz.com" className="inline-block mt-2 px-6 py-3 glass-subtle rounded-lg border border-slate-700 text-slate-50 font-medium hover:bg-slate-800/50 transition-colors">
              Support@techfamz.com
            </a>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-lg mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SlimShot AI. All rights reserved.
          </p>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  );
}
