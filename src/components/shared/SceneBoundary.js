"use client";
import { Component } from "react";

// If WebGL is unavailable, show the fallback instead of breaking the page.
export default class SceneBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {}
  render() { return this.state.failed ? this.props.fallback ?? null : this.props.children; }
}
