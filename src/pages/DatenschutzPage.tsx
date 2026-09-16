import LegalLayout, { LegalBlock, Placeholder } from '../components/LegalLayout';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function DatenschutzPage() {
  useDocumentMeta({
    title: 'Datenschutzerklärung — Leibinn Consulting',
    description: 'Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 und 14 DSGVO.',
    path: '/datenschutz',
    noindex: true,
  });

  return (
    <LegalLayout
      title="Datenschutzerklärung"
      intro="Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 und 14 DSGVO."
    >
      <LegalBlock heading="Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          <Placeholder>Firmenname</Placeholder>
          <br />
          <Placeholder>Anschrift</Placeholder>
          <br />
          E-Mail: <Placeholder>E-Mail-Adresse</Placeholder>
        </p>
        <p>
          Datenschutzbeauftragte:r: <Placeholder>Name und Kontakt, sofern benannt</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Hosting">
        <p>
          Diese Website wird bei <Placeholder>Hosting-Anbieter, Anschrift</Placeholder> gehostet.
          Der Anbieter verarbeitet in unserem Auftrag Daten, die beim Aufruf der Website anfallen.
          Grundlage ist ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.
        </p>
      </LegalBlock>

      <LegalBlock heading="Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden automatisch Informationen verarbeitet, die Ihr Browser
          übermittelt — insbesondere IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite,
          Referrer-URL sowie Browser- und Betriebssystemangaben. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der
          Website. Speicherdauer: <Placeholder>Aufbewahrungsfrist</Placeholder>.
        </p>
      </LegalBlock>

      <LegalBlock heading="Kontaktformular">
        <p>
          Wenn Sie uns über das Formular auf der Seite „Kontakt“ eine Anfrage senden, verarbeiten
          wir die von Ihnen eingegebenen Angaben: Vorname, Nachname, E-Mail-Adresse,
          Telefonnummer, Unternehmen, Unternehmensgröße, optional Ihre Position sowie Ihre
          Nachricht.
        </p>
        <p>
          Diese Daten werden zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen
          verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den
          Abschluss eines Vertrags gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund
          unseres berechtigten Interesses an der Beantwortung von Anfragen.
        </p>
        <p>
          Die Übermittlung erfolgt verschlüsselt. Ihre Angaben werden gelöscht, sobald sie für die
          Zweckerreichung nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen —
          spätestens <Placeholder>Löschfrist</Placeholder>.
        </p>
      </LegalBlock>

      <LegalBlock heading="Auftragsverarbeiter: Supabase">
        <p>
          Die über das Kontaktformular übermittelten Angaben werden in einer Datenbank des
          Anbieters Supabase gespeichert. Der Anbieter verarbeitet die Daten ausschließlich in
          unserem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags nach Art. 28 DSGVO.
        </p>
        <p>
          Serverstandort der eingesetzten Instanz: <Placeholder>Region</Placeholder>. Sofern eine
          Verarbeitung außerhalb der EU/des EWR stattfindet, erfolgt diese auf Grundlage
          von <Placeholder>Standardvertragsklauseln bzw. Angemessenheitsbeschluss</Placeholder>.
        </p>
      </LegalBlock>

      <LegalBlock heading="Schriftarten von Google Fonts">
        <p>
          Diese Website bindet Schriftarten über Google Fonts ein. Beim Seitenaufruf stellt Ihr
          Browser eine Verbindung zu Servern von Google her, wobei Ihre IP-Adresse übertragen
          wird. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p className="text-content-muted">
          Hinweis für die Umsetzung: Werden die Schriften stattdessen lokal ausgeliefert, entfällt
          diese Verbindung — und dieser Abschnitt ist entsprechend zu streichen.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cookies und Reichweitenmessung">
        <p>
          <Placeholder>
            Anzugeben, sofern Cookies, Analyse- oder Marketing-Dienste eingesetzt werden — inklusive
            Einwilligungsmanagement nach § 25 TDDDG
          </Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung
          (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit
          (Art. 20 DSGVO) sowie ein Widerspruchsrecht gegen Verarbeitungen auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO (Art. 21 DSGVO).
        </p>
        <p>
          Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur
          Ausübung Ihrer Rechte genügt eine Nachricht an die oben genannte Adresse.
        </p>
      </LegalBlock>

      <LegalBlock heading="Beschwerderecht bei der Aufsichtsbehörde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
          Ihrer personenbezogenen Daten zu beschweren. Zuständig ist in der Regel die Behörde Ihres
          Wohnsitzes oder unseres Unternehmenssitzes:
          <br />
          <Placeholder>Zuständige Aufsichtsbehörde</Placeholder>
        </p>
      </LegalBlock>

      <LegalBlock heading="Stand dieser Erklärung">
        <p>
          <Placeholder>Datum der letzten Aktualisierung</Placeholder>
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
