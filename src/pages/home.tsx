import Image from "next/image";

export default function Home() {
  return (
    <div className="page-content">
      <div id="content">
        <div className="section pt-4 px-3 px-lg-4 bg-light" id="hero">
          <div className="cover">
            <div className="container px-3">
              <div className="row">
                <div className="col-lg-6 p-2">
                  <img
                    className="img-fluid"
                    src="images/illustrations/hello3.svg"
                    alt="hello"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="mt-5">
                    <p className="lead text-uppercase mb-1">Hello!</p>
                    <h1
                      className="intro-title marker"
                      data-aos="fade-left"
                      data-aos-delay="50"
                    >
                      I’m Subhendu Das
                    </h1>
                    <p
                      className="lead fw-normal mt-3"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Full-Stack Developer & Mobile Application Developer
                    </p>
                    <div
                      className="social-nav"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <nav role="navigation">
                        <ul className="nav justify-content-left">
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="https://twitter.com//subhendu_io"
                              title="Twitter"
                            >
                              <i className="fab fa-twitter"></i>
                              <span className="menu-title sr-only">
                                Twitter
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="https://www.facebook.com//subhendu.io"
                              title="Facebook"
                            >
                              <i className="fab fa-facebook"></i>
                              <span className="menu-title sr-only">
                                Facebook
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="https://www.instagram.com//subhendu.io"
                              title="Instagram"
                            >
                              <i className="fab fa-instagram"></i>
                              <span className="menu-title sr-only">
                                Instagram
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="https://www.linkedin.com//subhendu.io"
                              title="LinkedIn"
                            >
                              <i className="fab fa-linkedin"></i>
                              <span className="menu-title sr-only">
                                LinkedIn
                              </span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="https://www.behance.net//subhendu.io"
                              title="Behance"
                            >
                              <i className="fab fa-behance"></i>
                              <span className="menu-title sr-only">
                                Behance
                              </span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div
                      className="mt-3"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <a
                        className="btn btn-primary shadow-sm mt-1 hover-effect"
                        href="#contact"
                      >
                        Get In Touch <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wave-bg"></div>
        </div>
        <div className="section pt-4 px-3 px-lg-4" id="about">
          <div className="container-narrow">
            <div className="row">
              <div className="col-md-6">
                <h2 className="h4 my-2">Hello! I’m Subhendu Das.</h2>
                <p>
                  I am passionate about Full-Stack Developer. I am a skilled
                  front-end and backend developer and master of graphic design
                  tools such as Photoshop and Sketch. I am a quick learner and a
                  team worker that gets the job done. I can easily capitalize on
                  low hanging fruits and quickly maximize timely deliverables
                  for real-time schemas.
                </p>
                <div className="row mt-3">
                  <div className="col-sm-2">
                    <div className="pb-1">Email:</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="pb-1 fw-bolder">subhendu.luv@gmail.com</div>
                  </div>
                  <div className="col-sm-2">
                    <div className="pb-1">Skype:</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="pb-1 fw-bolder">
                      subhendu.luv@outlook.com
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="pb-1">Phone:</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="pb-1 fw-bolder">+91 9804-615-141</div>
                  </div>
                  <div className="col-sm-2">
                    <div className="pb-1">Address:</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="pb-1 fw-bolder">Kolkata, India</div>
                  </div>
                  <div className="col-sm-2">
                    <div className="pb-1">Staus:</div>
                  </div>
                  <div className="col-sm-10">
                    <div className="pb-1 fw-bolder">Available</div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-5 offset-md-1"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <Image
                  className="avatar img-fluid mt-2"
                  src="/images/avatar.jpg"
                  width="400"
                  height="400"
                  alt="Subhendu Das"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section px-3 px-lg-4 pt-5" id="services">
          <div className="container-narrow">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">My Services</h2>
            </div>
            <div className="text-center">
              <p className="mx-auto mb-3" style={{ maxWidth: "600px" }}>
                {" "}
                I offer services fit for any website or app. I can quickly
                maximize timely deliverables for real-time schemas.
              </p>
            </div>
            <div className="row py-3">
              <div
                className="col-md-3 text-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Image
                  className="mb-2"
                  src="/images/services/web-design.svg"
                  width="96"
                  height="96"
                  alt="web design"
                />
                <div className="h5">Full-Stack Developer</div>
              </div>
              <div
                className="col-md-3 text-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Image
                  className="mb-2"
                  src="/images/services/graphic-design.svg"
                  width="96"
                  height="96"
                  alt="graphic design"
                />
                <div className="h5">Graphic Design</div>
              </div>
              <div
                className="col-md-3 text-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Image
                  className="mb-2"
                  src="/images/services/ui-ux.svg"
                  width="96"
                  height="96"
                  alt="ui-ux"
                />
                <div className="h5">UI/UX</div>
              </div>
              <div
                className="col-md-3 text-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <Image
                  className="mb-2"
                  src="/images/services/app-development.svg"
                  width="96"
                  height="96"
                  alt="app development"
                />
                <div className="h5">App Development</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section px-3 px-lg-4 pt-5" id="skills">
          <div className="container-narrow">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">My Skills</h2>
            </div>
            <div className="text-center">
              <p className="mx-auto mb-3" style={{ maxWidth: "600px" }}>
                I am a quick learner and specialize in multitude of skills
                required for Web Application Development and Product Design
              </p>
            </div>
            <div className="bg-light p-3">
              <div className="row">
                <div className="col-md-5">
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">HTML5</span>
                      <span>90%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="100"
                        data-aos-anchor=".skills-section"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">CSS3</span>
                      <span>90%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="200"
                        data-aos-anchor=".skills-section"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">JavaScript</span>
                      <span>80%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="300"
                        data-aos-anchor=".skills-section"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">React</span>
                      <span>75%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="300"
                        data-aos-anchor=".skills-section"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 offset-md-2">
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">PHP</span>
                      <span>70%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="400"
                        data-aos-anchor=".skills-section"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">WordPress</span>
                      <span>70%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="500"
                        data-aos-anchor=".skills-section"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">MySQL</span>
                      <span>60%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="600"
                        data-aos-anchor=".skills-section"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="py-1">
                    <div className="d-flex text-small fw-bolder">
                      <span className="me-auto">Photoshop</span>
                      <span>60%</span>
                    </div>
                    <div className="progress my-1">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        data-aos="zoom-in-right"
                        data-aos-delay="600"
                        data-aos-anchor=".skills-section"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section px-2 px-lg-4 pt-5" id="portfolio">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">Portfolio </h2>
            </div>
            <div
              className="grid bp-gallery pb-3"
              data-aos="zoom-in-up"
              data-aos-delay="100"
            >
              <div className="grid-sizer"></div>
              <div className="grid-item">
                <a href="https://dribbble.com">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/1-small.png"
                      data-bp="/images/portfolio/1.jpg"
                      alt=""
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">Web Design</h4>
                      <div>Dribbble.com</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://github.com">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/2-small.png"
                      data-bp="images/portfolio/2.jpg"
                      data-caption="Example of an optional caption."
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">Web Development</h4>
                      <div>GitHub.com</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://soundcloud.com/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/3-small.png"
                      data-bp="images/portfolio/3.jpg"
                      data-caption="Example of an optional caption."
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">Audio Mixing</h4>
                      <div>Soundcloud.com</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://www.adobe.com/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/4-small.png"
                      data-bp="images/portfolio/4.jpg"
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">Video Editing</h4>
                      <div>Adobe After Effects</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://www.adobe.com/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/5-small.png"
                      data-bp="images/portfolio/5.jpg"
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">Photography</h4>
                      <div>Adobe Photoshop</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://www.android.com/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/6-small.png"
                      data-bp="images/portfolio/6.jpg"
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">App Development</h4>
                      <div>Android</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://flutter.dev/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/7-small.png"
                      data-bp="images/portfolio/7.jpg"
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">App Design</h4>
                      <div>Flutter</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
              <div className="grid-item">
                <a href="https://flutter.dev/">
                  <figure className="portfolio-item">
                    <img
                      src="images/portfolio/8-small.png"
                      data-bp="images/portfolio/8.jpg"
                    />
                    <figcaption>
                      <h4 className="h5 mb-0">App Development</h4>
                      <div>Flutter</div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section px-3 px-lg-4 pt-5" id="experience">
          <div className="container-narrow">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">Experience</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div
                  className="card mb-3"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  <div className="card-header px-3 py-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="h5 mb-1">UI/UX Design</h3>
                        <div className="text-muted text-small">
                          Designerr Inc. <small>(2012-2014)</small>
                        </div>
                      </div>
                      <Image
                        src="/images/services/ui-ux.svg"
                        width="48"
                        height="48"
                        alt="ui-ux"
                      />
                    </div>
                  </div>
                  <div className="card-body px-3 py-2">
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for
                      high level overviews. Iterative approaches to corporate
                      strategy foster collaborative thinking to further the
                      overall value proposition.
                    </p>
                    <p>
                      Organically grow the holistic world view of disruptive
                      innovation via workplace diversity and empowerment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card mb-3"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <div className="card-header px-3 py-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="h5 mb-1">App Development</h3>
                        <div className="text-muted text-small">
                          MakeMyApp LLC. <small>(2015-2018)</small>
                        </div>
                      </div>
                      <Image
                        src="/images/services/app-development.svg"
                        width="48"
                        height="48"
                        alt="app development"
                      />
                    </div>
                  </div>
                  <div className="card-body px-3 py-2">
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for
                      high level overviews. Iterative approaches to corporate
                      strategy foster collaborative thinking to further the
                      overall value proposition.
                    </p>
                    <p>
                      Organically grow the holistic world view of disruptive
                      innovation via workplace diversity and empowerment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card mb-3"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <div className="card-header px-3 py-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="h5 mb-1">Web Design</h3>
                        <div className="text-muted text-small">
                          Webbie LLC. <small>(2018-2020)</small>
                        </div>
                      </div>
                      <Image
                        src="/images/services/web-design.svg"
                        width="48"
                        height="48"
                        alt="web design"
                      />
                    </div>
                  </div>
                  <div className="card-body px-3 py-2">
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for
                      high level overviews. Iterative approaches to corporate
                      strategy foster collaborative thinking to further the
                      overall value proposition.
                    </p>
                    <p>
                      Organically grow the holistic world view of disruptive
                      innovation via workplace diversity and empowerment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card mb-3"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <div className="card-header px-3 py-2">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="h5 mb-1">Full Stack Development</h3>
                        <div className="text-muted text-small">
                          Coder Inc. <small>(2020-2021)</small>
                        </div>
                      </div>
                      <Image
                        src="/images/services/full-stack.svg"
                        width="48"
                        height="48"
                        alt="full stack"
                      />
                    </div>
                  </div>
                  <div className="card-body px-3 py-2">
                    <p>
                      Leverage agile frameworks to provide a robust synopsis for
                      high level overviews. Iterative approaches to corporate
                      strategy foster collaborative thinking to further the
                      overall value proposition.
                    </p>
                    <p>
                      Organically grow the holistic world view of disruptive
                      innovation via workplace diversity and empowerment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section px-3 px-lg-4 pt-5" id="testimonials">
          <div className="container-narrow">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">Client Testimonials</h2>
            </div>
            <div className="row">
              <div
                className="col-md-6 mb-5"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div className="d-flex ms-md-3">
                  <span>
                    <i className="fas fa-2x fa-quote-left"></i>
                  </span>
                  <span className="m-2">
                    Walter displays exemplary professionalism and is able to
                    take on challenges. He learns quickly and is an asset to any
                    team.
                  </span>
                </div>
                <div className="d-flex justify-content-end align-items-end">
                  <div className="text-end me-2">
                    <div className="fw-bolder">Aiyana</div>
                    <div className="text-small">CEO / Web Design Company</div>
                  </div>
                  <Image
                    className="me-md-3 rounded"
                    src="/images/testimonials/client1.jpg"
                    width="96"
                    height="96"
                    alt="client 1"
                  />
                </div>
              </div>
              <div
                className="col-md-6 mb-5"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="d-flex ms-md-3">
                  <span>
                    <i className="fas fa-2x fa-quote-left"></i>
                  </span>
                  <span className="m-2">
                    Walter displays exemplary professionalism and is able to
                    take on challenges. He learns quickly and is an asset to any
                    team.
                  </span>
                </div>
                <div className="d-flex justify-content-end align-items-end">
                  <div className="text-end me-2">
                    <div className="fw-bolder">Alexander</div>
                    <div className="text-small">CEO / Web Design Company</div>
                  </div>
                  <Image
                    className="me-md-3 rounded"
                    src="/images/testimonials/client2.jpg"
                    width="96"
                    height="96"
                    alt="client 1"
                  />
                </div>
              </div>
              <div
                className="col-md-6 mb-5"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="d-flex ms-md-3">
                  <span>
                    <i className="fas fa-2x fa-quote-left"></i>
                  </span>
                  <span className="m-2">
                    Walter is a great co-worker and problem solver. He is quick
                    to extend his helping hand and makes a good team player.
                  </span>
                </div>
                <div className="d-flex justify-content-end align-items-end">
                  <div className="text-end me-2">
                    <div className="fw-bolder">Ariya</div>
                    <div className="text-small">Web Developer</div>
                  </div>
                  <Image
                    className="me-md-3 rounded"
                    src="/images/testimonials/client3.jpg"
                    width="96"
                    height="96"
                    alt="client 1"
                  />
                </div>
              </div>
              <div
                className="col-md-6 mb-5"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <div className="d-flex ms-md-3">
                  <span>
                    <i className="fas fa-2x fa-quote-left"></i>
                  </span>
                  <span className="m-2">
                    Walter is a great co-worker and problem solver. He is quick
                    to extend his helping hand and makes a good team player.
                  </span>
                </div>
                <div className="d-flex justify-content-end align-items-end">
                  <div className="text-end me-2">
                    <div className="fw-bolder">Braiden</div>
                    <div className="text-small">Web Designer</div>
                  </div>
                  <Image
                    className="me-md-3 rounded"
                    src="/images/testimonials/client4.jpg"
                    width="96"
                    height="96"
                    alt="client 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section px-2 px-lg-4 pb-4 pt-5 mb-5" id="contact">
          <div className="container-narrow">
            <div className="text-center mb-5">
              <h2 className="marker marker-center">Contact Me</h2>
            </div>
            <div className="row">
              <div className="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                <div className="bg-light my-2 p-3 pt-2">
                  <form
                    action="https://formspree.io/subhendu.luv@gmail.com"
                    method="POST"
                  >
                    <div className="form-group my-2">
                      <label className="form-label fw-bolder">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        required
                      />
                    </div>
                    <div className="form-group my-2">
                      <label className="form-label fw-bolder">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        name="_replyto"
                        required
                      />
                    </div>
                    <div className="form-group my-2">
                      <label className="form-label fw-bolder">Message</label>
                      <textarea
                        className="form-control"
                        style={{ resize: "none" }}
                        id="message"
                        name="message"
                        rows={4}
                        required
                      ></textarea>
                    </div>
                    <button className="btn btn-primary mt-2" type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </div>
              <div
                className="col-md-6"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mt-3 px-1">
                  <div className="h5">Let’s talk how I can help you!</div>
                  <p>
                    If you like my work and want to avail my services then drop
                    me a message using the contact form.{" "}
                  </p>
                  <p>
                    Or get in touch using my email, skype or my contact number.
                  </p>
                  <p>See you!</p>
                </div>
                <div className="mt-53 px-1">
                  <div className="row">
                    <div className="col-sm-2">
                      <div className="pb-1">Email:</div>
                    </div>
                    <div className="col-sm-10">
                      <div className="pb-1 fw-bolder">
                        subhendu.luv@gmail.com
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="pb-1">Skype:</div>
                    </div>
                    <div className="col-sm-10">
                      <div className="pb-1 fw-bolder">
                        subhendu.luv@outlook.com
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="pb-1">Phone:</div>
                    </div>
                    <div className="col-sm-10">
                      <div className="pb-1 fw-bolder">+91 9804-615-141</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
