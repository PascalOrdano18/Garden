export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pascal Ordano',
    url: 'https://pordano.com',
    jobTitle: 'Founding Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Roomix.ai',
      url: 'https://roomix.ai',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Instituto Tecnológico de Buenos Aires',
      url: 'https://www.itba.edu.ar/',
    },
    sameAs: [
      'https://github.com/PascalOrdano18',
      'https://x.com/pascalordanoo',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
