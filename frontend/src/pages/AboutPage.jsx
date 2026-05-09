import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#4B2C20]">{t('about.title')}</h1>
        <p className="text-gray-500 text-lg">{t('about.subtitle')}</p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">{t('about.q1.title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('about.q1.content')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">{t('about.q2.title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('about.q2.content')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">{t('about.q3.title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('about.q3.content')}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#006341] mb-4">{t('about.q4.title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('about.q4.content')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
