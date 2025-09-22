import DistributorsMap from "../components/ui/DistributorsMap";
import DistributorsData from "../components/DistributorsData";
import PageHeader from "../components/ui/PageHeader";
import HeaderBg from "../assets/images/SitesBg.webp";

const Contact = () => {
  return (
    <div>
      <PageHeader title="Contact Us" />

      <DistributorsMap
        title="Where to buy? We have global presence!"
        titleColor="text-[#00406F]"
        titleWeight="font-bold"
        distributorsData={DistributorsData}
        mapTheme="blue"
        pointBackgroundColor="#6EC2FF"
        showRadialBackground={false}
        mapLinesTranslateY={-0.05}
        mapLinesScale={0.99}
        cardTextColor="text-gray-900"
        cardIconFilter="filter brightness-0 opacity-70"
        cardShadow="none"
        mobileCardIconColor="filter brightness-0 opacity-70"
      />

      {/* Información de contacto */}
      <div className="py-4 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Our office */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#00406F]">
                Our office
              </h3>
              <p className="text-[#00406F]">Yangming Mountain 144, China</p>
            </div>

            {/* Our email */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#00406F]">
                Our email
              </h3>
              <a
                href="mailto:info@klugcompany.com"
                className="text-[#00406F] hover:text-blue-800 transition-colors block"
              >
                info@klugcompany.com
              </a>
            </div>

            {/* Our phone number */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#00406F]">
                Our phone number
              </h3>
              <a
                href="tel:+8618138859780"
                className="text-[#00406F] hover:text-blue-800 transition-colors block"
              >
                +86 18138859780
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
