import Link from "next/link";
import appData from "@data/app.json";
import { useEffect } from "react";
import ImageView from "@components/ImageView";
import { footerSticky } from "@common/utilits";

const Footer2 = () => {
  useEffect(() => {
    footerSticky();
  }, []);

  return (
    <>
      {/* Footer */}
      <footer className="onovo-footer footer--white">
        <div className="footer--default">
          <div className="container">
            <div className="row gap-bottom-40">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* Heading */}
                <div className="onovo-heading">
                  <h2 className="onovo-title-2">
                    <span>
                      Let’s Chat! Let’s Build Something <br />
                      Awesome Together
                    </span>
                  </h2>
                  <p>
                    <Link
                      href="/contact"
                      className="onovo-footer-lnk onovo-lnk lnk--revert"
                    >
                      Lets Start Project
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="row gap-bottom-40">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">
                {/* Logo */}
                <div
                  className="onovo-f-logo gap-bottom-40"
                  style={{ maxWidth: "70px" }}
                >
                  <Link href="/">
                    <img
                      src={appData.footer.logo.image}
                      alt={appData.footer.logo.alt}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                {/* Description */}
                <div className="onovo-text">
                  From the moment our company was founded, we have helped our
                  clients find exceptional solutions{" "}
                  <strong>for their businesses</strong>.
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 offset-lg-1">
                {/* Description */}
                <div className="onovo-text">
                  <ul className="onovo-footer-menu">
                    <li>
                      <Link href="/services/branding">
                        <span className="onovo-lnk">Branding</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/native-and-web-apps">
                        <span className="onovo-lnk">
                          Native &#038; Web Apps
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/desktop-apps">
                        <span className="onovo-lnk">Desktop Apps</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/ui-ux-design">
                        <span className="onovo-lnk">UI / UX Design</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/mobile-apps">
                        <span className="onovo-lnk">Mobile Apps</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">
                {/* Description */}
                <div className="onovo-text">
                  Baird House, 15-17 St Cross St <br />
                  London EC1N 8UW
                  <p>
                    <a
                      className="onovo-lnk"
                      href="tel:+4402074302973"
                      target="blank"
                    >
                      +44 (0) 20 7430 2973
                    </a>
                    <br />
                    <a
                      className="onovo-lnk"
                      href="mailto:username@domain.com"
                      target="blank"
                    >
                      username@domain.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-self-center">
                {/* Copyright */}
                <div className="copyright">
                  <div
                    dangerouslySetInnerHTML={{ __html: appData.footer.copy }}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-right">
                {/* Social*/}
                <div className="onovo-social-1 onovo-social-active">
                  <ul>
                    {appData.social.map((item, key) => (
                      <li key={`fsocial-item-${key}`}>
                        <a
                          className="onovo-social-link onovo-hover-2"
                          href={item.link}
                          title={item.title}
                          target="_blank"
                        >
                          <i className={item.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ImageView />
    </>
  );
};
export default Footer2;
