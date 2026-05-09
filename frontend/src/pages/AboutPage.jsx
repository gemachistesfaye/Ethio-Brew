import React from 'react';

const AboutPage = () => {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#4B2C20]">Our Purpose</h1>
        <p className="text-gray-500 text-lg">Why Ethio-Brew was built and what we stand for.</p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">Why does Ethio-Brew exist?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Ethio-Brew exists to bridge the massive gap between the birthplace of coffee and global consumers. Historically, Ethiopian coffee has been commoditized and mixed, losing its unique regional identities. We built this platform to offer a direct, transparent channel where consumers can buy 100% authentic, single-origin Ethiopian beans directly from the source.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">Why is Ethiopian coffee globally important?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Ethiopia is the genetic birthplace of Coffea arabica. Unlike other regions where coffee was introduced, Ethiopia has thousands of undocumented heirloom varieties growing wild in its forests. This incredible genetic diversity produces flavor profiles—from intense floral notes in Yirgacheffe to heavy berry profiles in Harrar—that simply cannot be replicated anywhere else on Earth.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">Why does supporting farmers matter?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Coffee is the backbone of the Ethiopian economy, yet the farmers who cultivate these world-class beans often receive the smallest fraction of the profit. Traditional supply chains are filled with middlemen. By prioritizing direct trade, Ethio-Brew ensures that farmers are paid fairly for their labor and expertise. Fair compensation empowers communities, funds local education, and encourages sustainable farming practices that protect the coffee forests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">Why is a digital coffee marketplace needed?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            In an era of instant global connectivity, the coffee trade has remained unnecessarily opaque. A digital marketplace cuts through the noise. It provides transparency, allowing buyers to see exactly where their coffee comes from, who grew it, and how it was processed. This digital infrastructure removes geographical barriers, allowing a farmer in the highlands of Sidamo to sell directly to a coffee lover halfway across the world, ensuring freshness and authenticity.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
