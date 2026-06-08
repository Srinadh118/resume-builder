import Hero from "../../components/Hero/Hero";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { LockKeyhole, Palette, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: <Sparkles />,
    title: "ATS-Optimized",
    description:
      "Our intelligent scoring system ensures your resume passes through applicant tracking systems with flying colors.",
  },
  {
    icon: <Palette />,
    title: "Beautiful Templates",
    description:
      "Choose from professionally designed templates that make your resume stand out to recruiters.",
  },
  {
    icon: <Zap />,
    title: "Real-time Preview",
    description:
      "See changes instantly as you build your resume. No more guesswork in formatting and layout.",
  },
  {
    icon: <LockKeyhole />,
    title: "Secure & Private",
    description:
      "Your data is encrypted and stored securely. We never share your personal information with third parties.",
  },
];

function Landing() {
  return (
    <div className="landing">
      <Hero />

      <section className="landing__features" id="features">
        <div className="landing__container">
          <h2 className="landing__section-title">Why Choose ResumeBuilder?</h2>
          <p className="landing__section-subtitle">
            Everything you need to create a professional resume that gets
            noticed
          </p>
          <div className="landing__grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="landing__how-it-works" id="how-it-works">
        <div className="landing__container">
          <h2 className="landing__section-title">How It Works</h2>
          <p className="landing__section-subtitle">
            Create your perfect resume in three simple steps
          </p>
          <div className="landing__steps">
            <div className="landing__step">
              <div className="landing__step-number">01</div>
              <h3 className="landing__step-title">Choose a Template</h3>
              <p className="landing__step-description">
                Select from our collection of professionally designed templates.
              </p>
            </div>
            <div className="landing__step-arrow">→</div>
            <div className="landing__step">
              <div className="landing__step-number">02</div>
              <h3 className="landing__step-title">Fill in Your Details</h3>
              <p className="landing__step-description">
                Add your experience, education, and skills with our intuitive
                editor.
              </p>
            </div>
            <div className="landing__step-arrow">→</div>
            <div className="landing__step">
              <div className="landing__step-number">03</div>
              <h3 className="landing__step-title">Download & Share</h3>
              <p className="landing__step-description">
                Export your resume as a PDF and start applying to your dream
                jobs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
