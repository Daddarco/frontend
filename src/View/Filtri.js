import React from 'react';
import Accordion from '../components/Accordion';

export default function Filtri() {
  // non ho preso 'data' dinamicamente perchè è un bordello
  const data = [
    {
      id: 0,
      label: 'Strategia',
      campi: ['Abstract', 'Control', 'Enforce', 'Hide', 'Inform', 'Minimize', 'Separate']
    },
    {
      id: 1,
      label: 'Collocazione MVC',
      campi: ['Controller', 'Model', 'View']
    },
    {
      id: 2,
      label: 'Fase ISO',
      campi: ['6 Plan the human-centered design process',
              '7.2 Understanding and specifying the context of use',
              '7.3 Specify the requirements',
              '7.4 Producing design solutions',
              '7.5 Evaluating the design']
    },
    {
      id: 3,
      label: 'Articolo GDPR',
      campi: ['Article 5 - Principles relating to processing of personal data',
              'Article 6 - Lawfulness of processing',
              'Article 7 - Conditions for consent',
              'Article 12 - Transparent information, communication and modalities for the exercise of the rights of the data subject',
              'Article 13 - Information to be provided where personal data are collected from the data subject',
              'Article 25 - Data protection by design and by default',
              'Article 28 - Processor',
              'Article 32 - Security of processing',
              'Article 33 - Notification of a personal data breach to the supervisory authority',
              'Article 34 - Communication of a personal data breach to the data subject',
              'Article 35 - Data protection impact assessment',
              'NA']
    },
    {
      id: 4,
      label: 'Principio PbD',
      campi: ['End-to-End Security',
              'Full Functionality',
              'Privacy Embedded into Design',
              'Privacy as the default setting',
              'Proactive not Reactive',
              'Respect for User Privacy',
              'Visibility and Transparency']
    },
    {
      id: 5,
      label: 'Categoria OWASP',
      campi: ['A01: Broken Access Control',
              'A02: Cryptographic Failures',
              'A03: Injection',
              'A04: Insecure Design',
              'A05: Security Misconfiguration',
              'A06: Vulnerable and Outdated Components',
              'A07: Identification and Authentication Failures',
              'A08: Software and Data Integrity Failures',
              'A09: Security Logging and Monitoring Failures',
              'A10: Server-Side Request Forgery (SSRF)']
    },
    {
      id: 6,
      label: 'CWE',
      campi: ['CWE-20: Improper Input Validation',
              `CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')`,
              `CWE-77: Improper Neutralization of Special Elements used in a Command ('Command Injection')`,
              `CWE-78: Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')`,
              `CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')`,
              `CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')`,
              `CWE-94: Improper Control of Generation of Code ('Code Injection')`,
              'CWE-269: Improper Privilege Management',
              'CWE-276: Incorrect Default Permissions',
              'CWE-287: Improper Authentication',
              'CWE-306: Missing Authentication for Critical Function',
              'CWE-434: Unrestricted Upload of File with Dangerous Type',
              'CWE-502: Deserialization of Untrusted Data',
              'CWE-798: Use of Hard-coded Credentials',
              'CWE-862: Missing Authorization',
              'CWE-863: Incorrect Authorization',
              'CWE-918: Server-Side Request Forgery (SSRF)']
    }
  ];

  return (
    <div>
      <Accordion items={data} keepOthersOpen={true} />
    </div>
  );
}