// src/pages/Home.js
import React from "react";
import Nav from "../components/Nav";

function Home() {
  return (
    <>
      <Nav />
      <div className="container mt-4">
        <div className="text-center">
          <h1 className="mb-3">Welcome to MyApp</h1>
          <p className="lead">This is your home page.</p>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Feature 1</h5>
                <p className="card-text">Quick description of feature 1.</p>
                <a href="/" className="btn btn-primary">
                  Go
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Feature 2</h5>
                <p className="card-text">Quick description of feature 2.</p>
                <a href="/" className="btn btn-primary">
                  Go
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Feature 3</h5>
                <p className="card-text">Quick description of feature 3.</p>
                <a href="/" className="btn btn-primary">
                  Go
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
