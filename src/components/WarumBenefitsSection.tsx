import { motion } from "framer-motion";
import { Star, Link2, HeartPulse, Users } from "lucide-react";

type SegmentId = "attraktivitaet" | "bindung" | "gesundheit" | "kultur";

const BenefitVennDiagram = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 810"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    {/* Segment 1 – Arbeitgeberattraktivität */}
    <path
      fill="#2A2D7C"
      d="M790.09 397.363c-77.281-122.695-256.68-122.633-333.906 0-53.73-101.582-3.926-228.254 104.683-266.058 40.008-14.032 84.535-14.028 124.535 0 108.594 37.77 158.426 164.515 104.688 266.058m0 0"
    />

    {/* Segment 2 – Mitarbeiterbindung */}
    <path
      fill="#15174F"
      d="M711.672 669.738c-101.613 53.711-228.32 3.914-266.14-104.656-14.024-39.969-14.024-84.457-.032-124.418 37.762-108.605 164.559-158.476 266.172-104.73-122.73 77.261-122.664 256.59 0 333.804m0 0"
    />

    {/* Segment 3 – Gesundheit & Wohlbefinden */}
    <path
      fill="#202266"
      d="M1005.863 502.277c.145 43.45-15.324 86.555-43.097 119.993v.003C907.94 689.5 811.305 710.234 733.707 671.48c-94.95-46.546-132.984-163.812-83.484-257.156 77.28 122.692 256.683 122.63 333.91 0 14.234 26.969 21.73 57.219 21.73 87.953m0 0"
    />

    {/* Segment 4 – Teamkultur & Identifikation */}
    <path
      fill="#0B0C39"
      d="M1005.305 308.852c-.461 142.168-150.739 232.613-276.66 166.902 122.73-77.262 122.66-256.598 0-333.805 125.894-65.754 276.277 24.863 276.66 166.903m0 0"
    />
  </svg>
);

const segments = [
  {
    id: "attraktivitaet" as SegmentId,
    label: "Arbeitgeberattraktivität",
    description:
      "Ihre Benefits machen auf einen Blick sichtbar, warum sich qualifizierte Bewerbende für Ihr Unternehmen entscheiden sollten.",
    position: "top-left",
    color: "#2A2D7C",
    icon: Star,
    offsetX: "0px",
    offsetY: "100px",
  },
  {
    id: "bindung" as SegmentId,
    label: "Mitarbeiterbindung",
    description:
      "Regelmäßig spürbare Vorteile stärken Loyalität und reduzieren Fluktuation – gerade bei leistungstragenden Mitarbeitenden.",
    position: "top-right",
    color: "#15174F",
    icon: Link2,
    offsetX: "0px",
    offsetY: "100px",
  },
  {
    id: "gesundheit" as SegmentId,
    label: "Gesundheit & Wohlbefinden",
    description:
      "Moderne Gesundheitsangebote entlasten Teams, reduzieren Ausfälle und erhöhen langfristig die Leistungsfähigkeit.",
    position: "bottom-right",
    color: "#202266",
    icon: HeartPulse,
    offsetX: "0px",
    offsetY: "-100px",
  },
  {
    id: "kultur" as SegmentId,
    label: "Teamkultur & Identifikation",
    description:
      "Benefits transportieren Haltung und Wertschätzung – und stärken damit das Wir-Gefühl in Ihrer Organisation.",
    position: "bottom-left",
    color: "#0B0C39",
    icon: Users,
    offsetX: "0px",
    offsetY: "-100px",
  },
];

export default function WarumBenefitsSection() {
  return (
    <section
      id="warum-benefits"
      className="w-full pt-20 md:pt-24 pb-4 px-0 overflow-visible bg-gradient-to-b from-[#FFFFFF] to-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header – keep existing copy */}
        <div className="relative z-20 text-center mb-8 px-4 sm:px-6 lg:px-10">
          <div className="mb-4">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Warum moderne Benefits unverzichtbar sind
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 leading-tight">
            Die vier zentralen Wirkungsbereiche moderner Benefits
          </h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto leading-relaxed mb-0">
            Benefits erfüllen heute weit mehr als nur eine symbolische Funktion. Sie wirken gleichzeitig auf
            Attraktivität, Bindung, Gesundheit und Kultur – und prägen damit das tägliche Erleben der Mitarbeitenden.
            Ein klares Benefit-System stärkt jede dieser Ebenen messbar.
          </p>
        </div>

        {/* Layout: Enlarged SVG diagram with icon labels and tooltips */}
        <div className="-mt-14">
          {/* Mobile stacked layout */}
          <div className="md:hidden space-y-6 mb-8 px-4 sm:px-6">
            {segments.map((segment) => {
              const Icon = segment.icon;
              return (
                <div
                  key={segment.id}
                  className="rounded-3xl px-4 py-3 shadow-xl border bg-white"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="inline-flex items-center justify-center rounded-full w-8 h-8 shadow-sm"
                      style={{ backgroundColor: segment.color }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                    <h3 className="text-sm font-semibold text-black">{segment.label}</h3>
                  </div>
                  <p className="text-xs text-black/70 leading-relaxed">{segment.description}</p>
                </div>
              );
            })}
          </div>

          {/* Desktop layout - centered square infographic */}
          <div
  className="
    relative 
    mt-0 mb-2 
    hidden md:flex 
    items-center justify-center 
    py-8 md:py-12

    /* Radial blue glow behind the diagram */
    bg-[radial-gradient(circle_at_50%_55%,rgba(42,45,124,0.22)_0%,rgba(42,45,124,0.06)_40%,rgba(42,45,124,0)_75%)]

    /* Grid overlay (stays behind content) */
    after:pointer-events-none
    after:absolute after:inset-0
    after:bg-[linear-gradient(to_right,rgba(255,255,255,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)]
    after:bg-[size:32px_32px]
    after:z-0

    /* Top & bottom fade overlay */
    before:pointer-events-none
    before:absolute before:inset-0
    before:bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0,rgba(255,255,255,0)_18%,rgba(255,255,255,0)_82%,rgba(255,255,255,1)_100%)]
    before:z-10
  "
>
            <div className="relative w-full max-w-5xl pt-2 pb-4 md:pt-2 md:pb-6 z-10" style={{ aspectRatio: '16/9' }}>
              {/* Center Venn Diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <BenefitVennDiagram
                  className="w-[70%] h-auto"
                />
              </motion.div>

              {/* Corner positioned labels */}
              {segments.map((segment) => {
                const Icon = segment.icon;

                const positionClasses = {
                  "top-left": "absolute top-0 left-0 flex flex-col items-start",
                  "top-right": "absolute top-0 right-0 flex flex-col items-end",
                  "bottom-right": "absolute bottom-0 right-0 flex flex-col items-end",
                  "bottom-left": "absolute bottom-0 left-0 flex flex-col items-start",
                };

                return (
                  <div
                    key={segment.id}
                    className={positionClasses[segment.position as keyof typeof positionClasses]}
                    style={{
                      transform: `translate(${segment.offsetX}, ${segment.offsetY})`,
                    }}
                  >
                    <div
                      className={`text-sm font-semibold text-black/80 flex flex-col gap-2 ${
                        segment.position.includes("right") ? "items-end" : "items-start"
                      }`}
                    >
                      <span
                        className="inline-flex items-center justify-center rounded-full w-12 h-12 shadow-sm"
                        style={{ backgroundColor: segment.color }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </span>
                      <span
                        className={segment.position.includes("right") ? "text-right" : "text-left"}
                      >
                        {segment.label}
                      </span>

                      {/* Description text - always visible */}
                      <div
                        className={`mt-2 max-w-xs px-0 text-sm text-black/70 leading-relaxed ${
                          segment.position.includes("right") ? "text-right" : "text-left"
                        }`}
                      >
                        {segment.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
