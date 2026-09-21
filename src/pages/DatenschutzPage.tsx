import LegalPage, { type LegalBlock } from './LegalPage';

/* ---------------------------------------------------------------------
 * TODO (client): have this reviewed by your data protection counsel and
 * replace every [...] placeholder. The processing described below
 * reflects what this site actually does today: a contact form whose
 * submissions are stored in Supabase. Fonts are self-hosted.
 * ------------------------------------------------------------------- */

const blocks: LegalBlock[] = [
  {
    heading: 'Verantwortliche Stelle',
    lines: [
      'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
      'Leibinn Consulting, Cedrik Leibinn, [Straße], [PLZ Ort], Deutschland',
      'E-Mail: [E-Mail-Adresse] · Telefon: [Telefonnummer]',
    ],
  },
  {
    heading: 'Erhebung und Verarbeitung personenbezogener Daten',
    lines: [
      'Personenbezogene Daten werden auf dieser Website nur erhoben, wenn Sie sie uns aktiv mitteilen – insbesondere über das Kontaktformular. Eine darüber hinausgehende Erhebung findet nicht statt.',
    ],
  },
  {
    heading: 'Kontaktformular',
    lines: [
      'Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von Ihnen angegebenen Daten (Vor- und Nachname, E-Mail-Adresse, Telefonnummer, Unternehmen, Unternehmensgröße, Position sowie Ihre Nachricht) zur Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss eines Vertrags gerichtet ist, im Übrigen unser berechtigtes Interesse an der Beantwortung von Anfragen nach Art. 6 Abs. 1 lit. f DSGVO.',
      'Die Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    ],
  },
  {
    heading: 'Auftragsverarbeitung (Hosting der Formulardaten)',
    lines: [
      'Die über das Kontaktformular übermittelten Daten werden bei Supabase gespeichert. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.',
      '[Anbieter, Sitz und Serverstandort ergänzen. Bei einer Verarbeitung außerhalb der EU/des EWR ist zusätzlich die Grundlage des Drittlandtransfers nach Art. 44 ff. DSGVO anzugeben.]',
    ],
  },
  {
    heading: 'Schriftarten',
    lines: [
      'Die auf dieser Website verwendeten Schriftarten werden lokal von unserem eigenen Server ausgeliefert. Es findet keine Verbindung zu Servern Dritter und keine Übermittlung Ihrer IP-Adresse an externe Anbieter statt.',
    ],
  },
  {
    heading: 'Server-Logfiles',
    lines: [
      'Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in Server-Logfiles, die Ihr Browser übermittelt. Eine Zusammenführung dieser Daten mit anderen Datenquellen findet nicht statt.',
    ],
  },
  {
    heading: 'Cookies und Analyse',
    lines: [
      'Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken ein und bindet keine Tracking-Dienste ein.',
    ],
  },
  {
    heading: 'Ihre Rechte',
    lines: [
      'Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO) sowie ein Widerspruchsrecht nach Art. 21 DSGVO.',
      'Darüber hinaus steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO).',
      'Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die oben genannte Adresse.',
    ],
  },
  {
    heading: 'SSL-/TLS-Verschlüsselung',
    lines: [
      'Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.',
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 13 DSGVO."
      blocks={blocks}
    />
  );
}
