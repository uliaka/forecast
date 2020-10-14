import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid #ff0066;
  background: #ff3399;
  color: white;
`;

const Error = ({ text }) => <ErrorContainer>{text}</ErrorContainer>;

export default Error;
