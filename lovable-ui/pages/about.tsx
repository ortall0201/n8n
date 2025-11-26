// lovable-ui/pages/about.tsx
// About page for Fashion Insights - Personal, minimal, editorial

import React from 'react';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      {/* Header */}
      <header className="py-8 px-6 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6">
        <article className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-8 text-gray-900">
            About Fashion Insights
          </h1>

          {/* Introduction - Warm & Personal */}
          <div className="prose prose-lg mb-12">
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              Fashion Insights is created by me, <strong>Ortal</strong>.
            </p>

            <p className="text-lg leading-relaxed text-gray-600 mb-6">
              I'm a data scientist, vibe coder and vibe solver who loves turning
              creator signals into simple, useful insights about what's trending
              in fashion and culture. I use data, AI and intuition to uncover
              patterns that feel real and make sense.
            </p>

            <p className="text-lg leading-relaxed text-gray-600 mb-12">
              This project started as a way to explore how we can use public
              social signals to understand fashion trends in real-time—without
              the noise, without the gatekeeping, just clean insights delivered
              to your inbox every week.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-12"></div>

          {/* The Approach */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light mb-6 text-gray-900">
              The Approach
            </h2>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>
                  <strong className="text-gray-800">Data with intuition</strong> –
                  Numbers tell a story, but context makes it real
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>
                  <strong className="text-gray-800">Respecting creators</strong> –
                  We analyze public trends, never re-host content, always attribute
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>
                  <strong className="text-gray-800">Simplicity</strong> –
                  Cut through the noise, deliver what matters
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>
                  <strong className="text-gray-800">Transparency</strong> –
                  Open about methods, honest about limitations
                </span>
              </li>
            </ul>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200 my-12"></div>

          {/* What This Does */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light mb-6 text-gray-900">
              What This Platform Does
            </h2>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Fashion Insights analyzes publicly available fashion content to identify:
            </p>

            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Emerging trends before they go mainstream</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Product recommendations from real influencers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Coupon codes and deals shared by creators</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Color palettes, styles, and brands gaining momentum</span>
              </li>
            </ul>

            <p className="text-gray-600 leading-relaxed">
              All delivered weekly via a clean, minimal newsletter—and optionally,
              as an audio summary you can listen to.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200 my-12"></div>

          {/* Contact CTA */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light mb-6 text-gray-900">
              Let's Connect
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              If you'd like to explore ideas or collaborate on something in
              fashion-tech or AI, I'd be happy to connect.
            </p>

            <a
              href="mailto:ortal@onsight-analytics.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Mail size={18} />
              <span>ortal@onsight-analytics.com</span>
            </a>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-200 my-12"></div>

          {/* Ethics Note */}
          <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg font-medium mb-4 text-gray-900">
              A Note on Ethics & Legal Safety
            </h3>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              This platform is built with respect for creators:
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span>We analyze only <strong>public</strong> data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span>We <strong>never</strong> re-host influencer images or content</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span>We <strong>always</strong> link to original posts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span>We're <strong>not affiliated</strong> with Instagram or any influencers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span>All content rights remain with original creators</span>
              </li>
            </ul>

            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              If you're an influencer and have concerns about how your public
              content appears here, please reach out—I'm happy to discuss.
            </p>
          </section>

          {/* Footer Note */}
          <footer className="text-center text-sm text-gray-400 pt-8">
            <p>Fashion Insights is a personal project by Ortal,</p>
            <p>built with curiosity and care.</p>
            <p className="mt-4">Not affiliated with Instagram, Meta, or any fashion brands.</p>
          </footer>
        </article>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <nav className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-900 transition">Home</a>
            <a href="/latest" className="hover:text-gray-900 transition">Latest Issue</a>
            <a href="/legal/disclaimer" className="hover:text-gray-900 transition">Disclaimer</a>
            <a href="/legal/privacy" className="hover:text-gray-900 transition">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
