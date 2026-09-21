import LegalPage, { type LegalBlock } from './LegalPage';

/* ---------------------------------------------------------------------
 * TODO (client): replace every [...] placeholder with the real company
 * data before going live. §5 DDG requires name, legal form, full postal
 * address, e-mail, telephone, and — where applicable — the register
 * court + number and the VAT ID (§27a UStG).
 * ------------------------------------------------------------------- */

const blocks: LegalBlock[] = [
  {
    heading: 'Angaben gemäß § 5 DDG',
    lines: [
      'Leibinn Consulting',
      '[Rechtsform, z. B. Einzelunternehmen]',
      '[Straße und Hausnummer]',
      '[PLZ und Ort]',
      'Deutschland',
    ],
  },
  {
    heading: 'Vertreten durch',
    lines: ['Cedrik Leibinn'],
  },
  {
    heading: 'Kontakt',
    lines: ['Telefon: [Telefonnummer]', 'E-Mail: [E-Mail-Adresse]'],
  },
  {
    heading: 'Umsatzsteuer-Identifikationsnummer',
    lines: [
      'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:',
      '[USt-IdNr. oder Hinweis auf Kleinunternehmerregelung nach § 19 UStG]',
    ],
  },
  {
    heading: 'Redaktionell verantwortlich',
    lines: ['Cedrik Leibinn', '[Anschrift wie oben]'],
  },
  {
    heading: 'Verbraucherstreitbeilegung',
    lines: [
      'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    heading: 'Haftung für Inhalte',
    lines: [
      'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    ],
  },
  {
    heading: 'Urheberrecht',
    lines: [
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
    ],
  },
];

export default function ImpressumPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Impressum"
      intro="Pflichtangaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)."
      blocks={blocks}
    />
  );
}
