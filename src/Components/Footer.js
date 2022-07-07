import React from "react";
import "./footer.css";
import logo from "../assets/logo.svg";
import pdf from "../assets/VaultyWp.pdf";
export default function Footer() {
  return (
    <div>
      {" "}
      <footer className="text-center bg-[#0d0d2b] text-white">
        <div className="flex flex-wrap justify-evenly p-20 items-start">
          <img src={logo} alt="Vaulty Logo" className="main-footer__logo" />
          <div>
            <ul style={{ textAlign: "justify" }}>
              <li className="text-2xl p-2 font-bold text-white">Application</li>
              <li className="p-2">Apple Store Logo</li>
              <li className="p-2">Android Store Logo</li>
            </ul>
          </div>

          <div>
            {" "}
            <ul style={{ textAlign: "justify" }}>
              <li className="text-2xl py-2 font-bold text-white">Conditions</li>
              <li>MasterCard </li>
              <li>Terms of Service</li>
              <li> Anti Fraud Policy</li>
              <li> Cookie Policy</li>
              <li>Terms of Credits</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Terms of Exchange</li>
            </ul>
          </div>
          <div>
            {" "}
            <ul style={{ textAlign: "justify" }}>
              <li className="text-2xl p-2 font-bold text-white">Follow Us</li>
              <li className="p-2">
                <div className="flex">
                  {" "}
                  <a
                    href="https://www.instagram.com/vaultypro/"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links">
                      <i class="fab fa-instagram"></i>
                    </div>
                    <span class="nav-link-text">Instagram</span>
                  </a>
                  <a
                    href="https://twitter.com/VaultyPRO"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-twitter"></i>
                    </div>
                    <span class="nav-link-text">Twitter</span>
                  </a>
                  <a
                    href="https://www.facebook.com/VaultyPRO"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-facebook"></i>
                    </div>
                    <span class="nav-link-text">Facebook</span>
                  </a>
                  <a
                    href="https://t.me/vaultypro"
                    target="_blank"
                    class="nav-item"
                  >
                    <div class="nav-links transition-all">
                      <i class="fab fa-telegram"></i>
                    </div>
                    <span class="nav-link-text">Telegram</span>
                  </a>
                </div>
              </li>
              <li className="p-2">
                <a
                  href={pdf}
                  target="_blank"
                  className="main-footer-navbar__nav__link"
                >
                  {" "}
                  <button class="px-4 py-2 mx-2 border border-sky-500 bg-transparent hover:bg-gradient-to-r from-[#a42e9a] to-[#5951f6] text-white text-2xl font-medium rounded-full">
                    Download Whitepaper
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="text-center text-2xl p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          ©2022 Valuty. All rights reserved
        </div>
      </footer>
    </div>
  );
}
