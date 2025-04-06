import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Style/Home.css'
import { FaMobileAlt, FaSearch, FaUserCircle, FaPhone, FaSimCard, FaMapMarkerAlt, FaGlobe, FaClock, FaChartLine, FaCheckCircle, FaFileAlt } from "react-icons/fa";

function Home() {
  const [carrier, setCarrier] = useState();
  const [country, setCountry] = useState();
  const [internationalFormat, setInternationalFormat] = useState();
  const [localFormat, setLocalFormat] = useState();
  const [location, setLocation] = useState();
  const [timezones, setTimezones] = useState([]);
  const [name, setName] = useState();
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGetDetails = async () => {
    if (!num) return toast.warn("Please enter a number!");
    if (num.length !== 10) return toast.warn("Please enter a valid 10-digit number!");

    try {
      setLoading(true);
      setShowResult(false);
      const result = await axios.get(
        `http://localhost:8080/api/truecaller?q=+91${num}`
      );

      if (result.status === 200) {
        const data = result.data.data || {};
        const resolvedName = result.data.name || result.data.Unknown || "Unknown";

        setName(resolvedName);
        setCarrier(result.data.carrier || "Not available");
        setCountry(result.data.country || "Not available");
        setInternationalFormat(result.data.internationalFormat || "Not available");
        setLocalFormat(result.data.local_format || "Not available");
        setLocation(result.data.location || "Not available");
        setTimezones(result.data.timezones || ["Not available"]);
        setShowResult(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-sleek">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4 glass-panel animate__animated animate__fadeIn">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="icon-container bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 animate__animated animate__bounceIn">
                    <FaMobileAlt size={28} />
                  </div>
                  <h1 className="h2 fw-bold text-white mb-2 animate__animated animate__fadeInDown">Phone Number Analyzer</h1>
                  <p className="text-light opacity-75 animate__animated animate__fadeInUp animate__delay-1s">
                    Discover carrier, location, and more details instantly
                  </p>
                </div>

                <div className="mb-4 animate__animated animate__zoomIn animate__delay-1s">
                  <div className="input-group input-group-lg glow-on-hover">
                    <span className="input-group-text bg-white border-end-0 fw-bold">+91</span>
                    <input
                      type="tel"
                      className="form-control border-start-0"
                      placeholder="Enter 10-digit number"
                      value={num}
                      maxLength={10}
                      onChange={(e) => setNum(e.target.value.replace(/\D/g, ''))}
                      onKeyPress={(e) => e.key === 'Enter' && handleGetDetails()}
                    />
                    <button 
                      onClick={handleGetDetails} 
                      className="btn btn-primary px-4 btn-pulse"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      ) : (
                        <FaSearch className="me-2" />
                      )}
                      Analyze
                    </button>
                  </div>
                </div>

                {showResult && (
                  <div className="mt-4 animate__animated animate__fadeInUp animate__delay-1s">
                    <div className="card border-0 shadow-sm result-card hover-lift">
                      <div className="card-header bg-primary bg-gradient text-white">
                        <div className="d-flex justify-content-between align-items-center">
                          <h2 className="h5 mb-0">
                            <FaFileAlt className="me-2" />
                            Analysis Report
                          </h2>
                          <span className="badge bg-success verified-badge">
                            <FaCheckCircle className="me-1" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-12">
                            <div className="p-3 bg-light rounded-3 animate__animated animate__pulse">
                              <h6 className="text-muted small mb-1">
                                <FaUserCircle className="me-1" />
                                Registered Name
                              </h6>
                              <h4 className="mb-0 text-primary">{name}</h4>
                            </div>
                          </div>

                          <div className="col-md-6 animate__animated animate__fadeInLeft">
                            <div className="p-3 border rounded-3 h-100 hover-lift">
                              <h6 className="text-muted small mb-1">
                                <FaPhone className="me-1" />
                                Phone Number
                              </h6>
                              <p className="mb-0 fw-bold">{localFormat|| `+91${num}`}</p>
                            </div>
                          </div>

                          <div className="col-md-6 animate__animated animate__fadeInRight">
                            <div className="p-3 border rounded-3 h-100 hover-lift">
                              <h6 className="text-muted small mb-1">
                                <FaSimCard className="me-1" />
                                Carrier
                              </h6>
                              <p className="mb-0 fw-bold">{carrier}</p>
                            </div>
                          </div>

                          <div className="col-md-6 animate__animated animate__fadeInLeft">
                            <div className="p-3 border rounded-3 h-100 hover-lift">
                              <h6 className="text-muted small mb-1">
                                <FaMapMarkerAlt className="me-1" />
                                Location
                              </h6>
                              <p className="mb-0 fw-bold">{location}</p>
                            </div>
                          </div>

                          <div className="col-md-6 animate__animated animate__fadeInRight">
                            <div className="p-3 border rounded-3 h-100 hover-lift">
                              <h6 className="text-muted small mb-1">
                                <FaGlobe className="me-1" />
                                Country
                              </h6>
                              <p className="mb-0 fw-bold">{country}</p>
                            </div>
                          </div>

                          <div className="col-12 animate__animated animate__fadeInUp">
                            <div className="p-3 border rounded-3 hover-lift">
                              <h6 className="text-muted small mb-1">
                                <FaClock className="me-1" />
                                Timezone
                              </h6>
                              <p className="mb-0 fw-bold">{timezones[0]}</p>
                            </div>
                          </div>

                          <div className="col-12 animate__animated animate__fadeInUp animate__delay-1s">
                            <div className="mt-3">
                              {/* <h6 className="text-muted small mb-2">
                                <FaChartLine className="me-1" />
                                Confidence Level
                              </h6> */}
                              <div className="progress" style={{ height: "8px" }}>
                                <div 
                                  className="progress-bar progress-bar-striped progress-bar-animated" 
                                  role="progressbar" 
                                  style={{ width: "100%" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="animate__animated animate__bounceIn"
      />
    </div>
  );
}

export default Home;