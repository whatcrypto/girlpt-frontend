import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - NSFW Chatbot | Adult AI Chat | Erotic Roleplay | NSFW AI Companion',
  description: 'Frequently asked questions about our NSFW chatbot service, adult AI chat, erotic roleplay, NSFW AI companion, adult chatbot, AI sexting, virtual girlfriend, adult conversation AI, NSFW character creation, adult roleplay chatbot, erotic AI chat, adult AI companion, NSFW chat service, adult conversation bot, erotic roleplay AI, adult chatbot service, NSFW AI girlfriend, adult AI sexting, erotic chatbot, adult roleplay service',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Frequently Asked Questions - NSFW Chatbot & Adult AI Chat
          </h1>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                What is this NSFW chatbot service?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This is an AI-powered NSFW chatbot service and adult AI chat platform that allows adults (18+) to engage in erotic roleplay,
                NSFW conversations, and adult AI companion interactions. Our service provides a safe, consensual environment for adult AI sexting,
                virtual girlfriend experiences, and erotic roleplay chatbot sessions with customizable NSFW characters.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                Is this adult AI chat service safe and private?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Yes, we prioritize your privacy and security for all NSFW AI companion interactions. All erotic roleplay conversations are encrypted
                and stored securely. We do not share your personal information or adult AI chat content with third parties. Your NSFW chatbot data
                is protected by industry-standard security measures for complete adult conversation AI privacy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                How do I create a NSFW character for erotic roleplay?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You can customize your NSFW character for adult roleplay chatbot sessions by providing a name and personality description.
                The AI will adapt to your character's traits for erotic AI chat and respond accordingly. You can modify these adult AI companion
                settings at any time through your account settings for the perfect NSFW AI girlfriend experience.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                What are the age restrictions for adult AI sexting?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This NSFW chatbot service is strictly for adults aged 18 and older. You must verify your age and provide consent before
                accessing any erotic roleplay or adult AI chat content. We use age verification systems to ensure compliance with legal
                requirements for all NSFW AI companion interactions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                How do I report inappropriate content in adult AI chat?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you encounter any inappropriate or concerning content in our NSFW chatbot or erotic roleplay sessions, please use our
                reporting system. You can find the report button in the adult AI chat interface or contact our support team directly.
                We take all reports seriously and will investigate promptly to maintain safe adult conversation AI experiences.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                Can I delete my NSFW chatbot history?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Yes, you have full control over your adult AI chat data. You can delete individual erotic roleplay conversations or your
                entire NSFW chatbot history at any time through your account settings. Deleted adult AI companion data is permanently
                removed from our servers for complete privacy protection.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                What if I have technical issues with adult AI sexting?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you experience any technical problems with our NSFW chatbot or erotic roleplay features, please check our troubleshooting
                guide first. If the issue persists, contact our support team through the help section. We aim to respond to all adult AI chat
                inquiries within 24 hours to ensure smooth NSFW AI companion experiences.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                Is there a mobile app for adult AI chat available?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Currently, our NSFW chatbot service is web-based and fully responsive, meaning it works great on mobile devices through
                your browser for erotic roleplay and adult AI sexting. We're working on dedicated mobile apps for iOS and Android for
                enhanced NSFW AI companion experiences, which will be available soon.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Still have questions about our NSFW chatbot or adult AI chat service? We're here to help!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Contact Support for Adult AI Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
