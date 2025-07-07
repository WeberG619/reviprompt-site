'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Lock, Eye, Database, CheckCircle, AlertTriangle } from 'lucide-react'


export default function SecurityPage() {

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Annual third-party security audits",
      status: "Certified"
    },
    {
      name: "GDPR Compliant",
      description: "European data protection standards",
      status: "Compliant"
    },
    {
      name: "CCPA Compliant",
      description: "California privacy protection",
      status: "Compliant"
    },
    {
      name: "ISO 27001",
      description: "Information security management",
      status: "In Progress"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/DCL-logo.png"
                alt="DevCraft Labs Logo"
                width={54}
                height={32}
              />
              <div>
                <span className="text-xl font-semibold text-neutral-900 dark:text-white">DevCraft Labs</span>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Security & Compliance</div>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Enterprise Security & Compliance
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Your data security is our top priority. We implement industry-leading security measures and maintain compliance with global standards.
          </p>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">End-to-End Encryption</h3>
              <p className="text-neutral-600 dark:text-neutral-400">All data encrypted in transit and at rest using AES-256 encryption</p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">24/7 Monitoring</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Continuous security monitoring and threat detection</p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Secure Infrastructure</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Enterprise-grade cloud infrastructure with multiple security layers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              We maintain the highest standards of security and compliance across global regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {cert.status === 'Certified' || cert.status === 'Compliant' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  )}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    cert.status === 'Certified' || cert.status === 'Compliant'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{cert.name}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Security Measures
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Comprehensive security controls protecting your data at every level.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Technical Safeguards
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Multi-Factor Authentication</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Required for all user accounts and administrative access</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Network Security</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Firewalls, VPNs, and intrusion detection systems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Data Encryption</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">AES-256 encryption for data at rest and TLS 1.3 in transit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Regular Security Audits</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Annual third-party penetration testing and vulnerability assessments</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Operational Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Access Controls</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Role-based access with principle of least privilege</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Security Training</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Regular security awareness training for all employees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Incident Response</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">24/7 security operations center with rapid response protocols</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">Data Backup</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">Automated backups with geographic redundancy and disaster recovery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Responsible Disclosure
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              We appreciate security researchers who help us maintain the highest security standards.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Security Bug Bounty Program
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              If you discover a security vulnerability, please report it responsibly through our security portal. 
              We offer rewards for valid security findings and commit to addressing all reports promptly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Reporting Guidelines</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• Email: security@devcraft-labs.com</li>
                  <li>• Include detailed reproduction steps</li>
                  <li>• Do not access user data</li>
                  <li>• Allow 90 days for resolution</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">Reward Structure</h4>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• Critical: $5,000 - $25,000</li>
                  <li>• High: $1,000 - $5,000</li>
                  <li>• Medium: $500 - $1,000</li>
                  <li>• Low: $100 - $500</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Questions About Security?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Our security team is available to answer questions about our security practices and compliance.
          </p>
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Security Team</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">security@devcraft-labs.com</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Response within 24 hours</p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Compliance Officer</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">compliance@devcraft-labs.com</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">For compliance inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}