import React from "react";
import "./assets/css/about.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-text">
          <h1>Về chúng tôi</h1>
          <p>
            Chúng tôi là đội ngũ chuyên nghiệp, luôn cam kết mang đến những sản
            phẩm và dịch vụ chất lượng nhất cho khách hàng.
          </p>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
            alt="About"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <h2>Sứ mệnh & Tầm nhìn</h2>
        <div className="mission-cards">
          <div className="card">
            <h3>Sứ mệnh</h3>
            <p>
              Mang đến giải pháp sáng tạo, tiện ích và hiệu quả cho mọi nhu cầu
              của khách hàng.
            </p>
          </div>
          <div className="card">
            <h3>Tầm nhìn</h3>
            <p>
              Trở thành thương hiệu uy tín, dẫn đầu trong lĩnh vực, luôn đổi mới
              và phát triển bền vững.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <h2>Đội ngũ của chúng tôi</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Member"
            />
            <h4>Nguyễn Văn A</h4>
            <p>CEO</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Member"
            />
            <h4>Trần Thị B</h4>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="Member"
            />
            <h4>Đinh Hoàng C</h4>
            <p>Designer</p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Member"
            />
            <h4>Phạm Văn D</h4>
            <p>Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
