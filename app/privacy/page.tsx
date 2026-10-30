import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | SlimShot AI',
  description: 'How the SlimShot AI app handles your data: what stays on your phone, what reaches our servers, and your choices.',
};

// A fixed date: the page says when the policy last changed, not when it was viewed.
const LAST_UPDATED = 'October 30, 2026';

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
            <p className="text-sm font-medium text-foreground">Last updated: {LAST_UPDATED}</p>
            <p>
              This policy explains what information the SlimShot AI mobile app (“the App”) handles, where it goes, and the choices you have. The App is made by Techfamz (“we”, “us”). If you use the App, this policy applies alongside our{' '}
              <Link href="/terms" className="text-foreground underline underline-offset-4">Terms of Service</Link>.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. The short version</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Editing, exporting and compressing happen <strong>on your phone</strong>. We never receive your videos or photos.</li>
              <li>The one feature that sends media is <strong>Auto captions</strong>: it uploads the <strong>sound</strong> of your video (never the picture) so it can be turned into text, and the sound is deleted once that is done.</li>
              <li>An account is <strong>optional</strong>. You only need one for features that use credits, such as Auto captions. An account holds your email address, a username and your credits.</li>
              <li>The App shows <strong>ads</strong> from Google AdMob.</li>
              <li>We do <strong>not sell</strong> your personal information. You can delete your account at any time.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. What stays on your phone</h2>
            <p>
              The videos and photos you pick, your edits and drafts, the videos you export, the files you compress, the voiceovers you record, and the contents of the home screen widget are created and kept on your device. We have no access to them. They leave your phone only if you share them yourself, or in the one case described next.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Auto captions</h2>
            <p>
              When you tap Generate, the App mixes the sound you chose (the video’s own sound, your audio tracks and voiceovers, or both) into one audio file and uploads it to our server. The picture of your video is never uploaded.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Our server sends the audio to a speech-to-text provider, currently Deepgram, ElevenLabs or xAI, which returns the spoken words and their timings. The provider processes the audio under its own terms and privacy policy.</li>
              <li>Our server deletes the audio file as soon as the job has finished, whether it succeeded or failed. The captions are kept on our server for a few minutes, so the App can collect them, and are then removed.</li>
              <li>We keep a record that the job ran and how many credits it cost, as part of your credits history.</li>
            </ul>
            <p>Please don’t caption audio you don’t have the right to share.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Your account</h2>
            <p>If you sign in, we collect and keep:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Your email address.</strong> With Google sign-in, we receive your Google account’s email address and its account ID. We do not receive your Google password, and we do not store your name or profile photo.</li>
              <li>The <strong>username</strong> you choose, and your <strong>referral code</strong>.</li>
              <li>Your <strong>credits balance and history</strong>: free credits, credits from rewarded ads and referrals, what you spent them on, and refunds.</li>
              <li><strong>Sign-in sessions</strong>, and a random token that identifies this installation of the App on your device. It is stored on our server only as a one-way hash, and the App keeps your sign-in tokens in your phone’s secure storage.</li>
            </ul>
            <p>
              If you sign in with an email code, we send the code through an email delivery service. We use your email address to sign you in and to answer you if you contact us. We do not send you marketing email.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Keeping free credits fair</h2>
            <p>To stop the same person claiming free credits again and again, we:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep a one-way hash of the email address and of the app installation that claimed the free sign-up credits. These hashes cannot be turned back into your email address, and they are <strong>kept after you delete your account</strong>, so a new account from the same email or installation does not receive the bonus again.</li>
              <li>Use a one-way hash of your IP address to limit how many sign-in codes and new accounts can come from one network in a short time. These counters expire after an hour or a day.</li>
              <li>Refuse disposable email addresses.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Ads</h2>
            <p>
              The App shows ads from Google AdMob: full-screen ads during or after some tasks, and rewarded ads you choose to watch, for example to unlock a feature or to earn credits. To show and measure ads and prevent ad fraud, AdMob may collect your device’s advertising ID, IP address, device information and how you interact with ads. Google’s use of this data is described in{' '}
              <a href="https://policies.google.com/technologies/partner-sites" className="text-foreground underline underline-offset-4" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use its services</a>.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In the European Economic Area, the UK and Switzerland, the App asks for your consent through Google’s consent form before ads are personalised.</li>
              <li>You can reset or delete your advertising ID, or opt out of personalised ads, in your Android settings.</li>
              <li>When you watch a rewarded ad for credits, Google tells our server that the ad was completed, using an ID linked to your SlimShot account, so the credits can be added. We receive no other information about you from the ad.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Fonts, music, sound effects and updates</h2>
            <p>
              Fonts, music and sound effects are downloaded from our servers and our content delivery providers when you choose them, and the App checks our server for new versions. Like any web request, these reveal your IP address and basic request details, which may appear in routine server logs. We don’t use them to identify you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Permissions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Photos and videos:</strong> to let you pick the files you want to edit or compress, and to save the results to your gallery. The App never scans or uploads your library.</li>
              <li><strong>Microphone:</strong> only while you record a voiceover in the editor. The recording is saved on your phone. It leaves your phone only if you include your audio tracks when you generate Auto captions (see section 3).</li>
              <li><strong>Internet:</strong> for your account, Auto captions, ads and downloads.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Analytics and crash reports</h2>
            <p>
              The App includes no analytics or crash-reporting tools of its own. If you have allowed Google Play to share usage and diagnostics, Google Play may give us anonymous crash and performance reports about the App.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. How we use information, and who we share it with</h2>
            <p>
              We use the information above only to provide the App’s features, run your account and credits, prevent abuse and fraud, keep our systems secure, and answer you when you contact us. We do <strong>not sell</strong> personal information, and we do not use your media to train AI models.
            </p>
            <p>We share information only with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service providers</strong> that work on our behalf: our hosting and database providers, cloud storage (Cloudflare R2, where private backups of our database are kept), our email delivery service, and the speech-to-text providers named in section 3.</li>
              <li><strong>Google</strong>, for Google sign-in and AdMob, as described above.</li>
              <li><strong>Authorities</strong>, where the law requires it, or to protect the rights and safety of our users or of us.</li>
              <li>A <strong>buyer or successor</strong>, if SlimShot AI is sold or merged. This policy will continue to apply to your information.</li>
            </ul>
            <p>
              Some of these providers process data in other countries, including the United States. Where they do, we rely on their contractual safeguards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. How long we keep it, and deleting your account</h2>
            <p>We keep your account information for as long as your account exists.</p>
            <p>
              You can delete your account in the App, under <strong>Settings → Account → Delete account</strong>, or on the web at{' '}
              <a href="https://slimshot-server.techfamz.com/account-deletion" className="text-foreground underline underline-offset-4" target="_blank" rel="noopener noreferrer">slimshot-server.techfamz.com/account-deletion</a>{' '}
              (we email you a code to confirm). When you delete your account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your email address, Google account ID, username and referral code are erased straight away, and you are signed out everywhere.</li>
              <li>Any credits you have left are forfeited.</li>
              <li>Your credits history and referral records are kept without anything that identifies you, so our accounts stay correct.</li>
              <li>The one-way hashes described in section 5 are kept.</li>
              <li>Copies of your account details may remain in our private database backups until those backups are deleted. We never restore a deleted account from a backup.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Security</h2>
            <p>
              Data travels between the App and our servers encrypted (HTTPS). Sign-in tokens are kept in your phone’s secure storage, identifiers we only need to compare are stored as one-way hashes, and our backups are private. No system is perfectly secure, but we work to protect your information and will act promptly if something goes wrong.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Your rights</h2>
            <p>
              Depending on where you live, for example under Nigeria’s Data Protection Act 2023 or the EU and UK GDPR, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>See the personal information we hold about you, and have it corrected or deleted.</li>
              <li>Object to, or ask us to limit, how we use it.</li>
              <li>Withdraw consent you have given, such as consent to personalised ads.</li>
              <li>Complain to your data protection authority. In Nigeria, that is the Nigeria Data Protection Commission.</li>
            </ul>
            <p>
              We use your information to provide the services you ask for (your account and Auto captions), for our legitimate interest in preventing abuse and keeping the App secure, and, for personalised ads where the law requires it, with your consent. To use any of these rights, email us at the address below.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Children</h2>
            <p>
              The App is not directed at children under 13, and you must be at least 13 to create an account, or older if the law where you live requires it. We do not knowingly collect personal information from children under 13. If you believe a child has given us personal information, contact us and we will delete it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">15. Changes to this policy</h2>
            <p>
              We will update this policy when the App changes how it handles information, and change the date at the top. If a change is significant, we will make it clear before it takes effect, for example with a notice in the App.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-foreground">16. Contact</h2>
            <p>
              For questions about this policy, or to use any of your rights, email us at:
            </p>
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
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  );
}
