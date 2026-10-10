import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

function Give() {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    accountName: "CAC Lifegate Centre",
    accountNumber: "4091194720",
    bankName: "Polaris Bank",
  };

  const givingOptions = [
    {
      number: "01",
      title: "Tithe",
      description:
        "Give your tithe as an expression of obedience and gratitude.",
    },
    {
      number: "02",
      title: "Offering",
      description:
        "Support the work of the church through your freewill offering.",
    },
    {
      number: "03",
      title: "Special Giving",
      description:
        "Support special programs, missions and church projects.",
    },
  ];

  const openDonation = (title) => {
    setSelectedDonation(title);
    setCopied(false);
  };

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(bankDetails.accountNumber);
      setCopied(true);
    } catch {
      window.prompt(
        "Copy the account number below:",
        bankDetails.accountNumber
      );
    }
  };

  return (
    <div className="inner-page">
      <Navbar />

      <PageHero
        label="GIVE"
        title="Give With Purpose"
        description="Your generosity helps support the work of God and the people we serve."
      />

      <section className="give-section">
        <div className="give-intro">
          <span className="section-label">GENEROSITY</span>

          <h2>
            Giving is an act
            <span> of worship.</span>
          </h2>

          <p>
            Everything we have comes from God. Through giving,
            we participate in His work and help create opportunities
            for people to encounter Christ.
          </p>
        </div>

        <div className="giving-options">
          {givingOptions.map((option) => (
            <div className="giving-card" key={option.number}>
              <span>{option.number}</span>
              <h3>{option.title}</h3>
              <p>{option.description}</p>

              <button
                type="button"
                className="primary-btn"
                onClick={() => openDonation(option.title)}
              >
                Give Online →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="scripture-section">
        <div>
          <span>SCRIPTURE</span>
          <h2>"God loves a cheerful giver."</h2>
          <p>2 Corinthians 9:7</p>
        </div>
      </section>

      {selectedDonation && (
        <div
          className="donation-overlay"
          onClick={() => setSelectedDonation(null)}
        >
          <div
            className="donation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="donation-close"
              onClick={() => setSelectedDonation(null)}
              aria-label="Close donation window"
            >
              &times;
            </button>

            <div className="donation-icon">♡</div>

            <span className="donation-label">CAC LIFEGATE CENTRE</span>

            <h2 id="donation-title">Give Your {selectedDonation}</h2>

            <p className="donation-description">
              Thank you for supporting God's work through CAC Lifegate
              Centre. You can make your donation using the bank details below.
            </p>

            <div className="donation-bank-card">
              <div className="bank-detail">
                <span>Bank</span>
                <strong>{bankDetails.bankName}</strong>
              </div>

              <div className="bank-detail">
                <span>Account Name</span>
                <strong>{bankDetails.accountName}</strong>
              </div>

              <div className="bank-detail account-number-row">
                <div>
                  <span>Account Number</span>
                  <strong className="account-number">
                    {bankDetails.accountNumber}
                  </strong>
                </div>

                <button
                  type="button"
                  className="copy-account-btn"
                  onClick={copyAccountNumber}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>

            <div className="donation-notice">
              <span>ℹ</span>
              <p>
                After making your transfer, keep your transaction receipt
                for your records.
              </p>
            </div>

            <button
              type="button"
              className="donation-done-btn"
              onClick={() => setSelectedDonation(null)}
            >
              Done
            </button>

            <p className="donation-thank-you">
              Thank you for giving with a cheerful heart.
            </p>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        .donation-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(8, 18, 13, 0.76);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .donation-modal {
          position: relative;
          width: 100%;
          max-width: 470px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          background: #fff;
          color: #202a23;
          border-radius: 22px;
          padding: 34px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
          animation: donationAppear 0.22s ease-out;
        }

        @keyframes donationAppear {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .donation-close {
          position: absolute;
          top: 15px;
          right: 17px;
          border: none;
          background: #f0f3f0;
          color: #26372c;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 25px;
          cursor: pointer;
        }

        .donation-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          border-radius: 16px;
          background: #e5f4eb;
          color: #126e51;
          font-size: 35px;
          margin-bottom: 20px;
        }

        .donation-label {
          color: #126e51;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
        }

        .donation-modal h2 {
          margin: 10px 0 12px;
          font-size: clamp(24px, 5vw, 30px);
          line-height: 1.2;
          color: #14271c;
        }

        .donation-description {
          color: #667168;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .donation-bank-card {
          background: #f5f8f5;
          border: 1px solid #e1e9e2;
          border-radius: 15px;
          padding: 8px 18px;
        }

        .bank-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px 0;
          border-bottom: 1px solid #e0e8e1;
        }

        .bank-detail:last-child {
          border-bottom: none;
        }

        .bank-detail > span,
        .account-number-row span {
          font-size: 12px;
          color: #778078;
        }

        .bank-detail strong {
          font-size: 15px;
          color: #24392b;
          overflow-wrap: anywhere;
        }

        .account-number-row {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .account-number-row > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .account-number {
          font-size: 21px !important;
          letter-spacing: 1px;
        }

        .copy-account-btn {
          border: 1px solid #126e51;
          background: #fff;
          color: #126e51;
          border-radius: 8px;
          padding: 9px 13px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
        }

        .copy-account-btn:hover {
          background: #e5f4eb;
        }

        .donation-notice {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #fff8e8;
          border-radius: 10px;
          padding: 12px;
          margin: 17px 0;
          color: #755c26;
        }

        .donation-notice > span {
          font-weight: 800;
        }

        .donation-notice p {
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
        }

        .donation-done-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 14px;
          background: #126e51;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .donation-done-btn:hover {
          background: #0c523c;
        }

        .donation-thank-you {
          margin: 15px 0 0;
          text-align: center;
          font-size: 12px;
          color: #7b847d;
        }

        @media (max-width: 480px) {
          .donation-modal {
            padding: 26px 20px;
            border-radius: 18px;
          }

          .account-number {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Give;