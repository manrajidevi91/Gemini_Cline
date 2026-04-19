/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Represents a test agent used in evaluations and tests.
 */
export interface TestAgent {
  /** The unique name of the agent. */
  readonly name: string;
  /** The full YAML/Markdown definition of the agent. */
  readonly definition: string;
  /** The standard path where this agent should be saved in a test project. */
  readonly path: string;
  /** A helper to spread this agent directly into a 'files' object for evalTest. */
  readonly asFile: () => Record<string, string>;
}
/**
 * A collection of predefined test agents for use in evaluations and tests.
 */
export declare const TEST_AGENTS: {
  /**
   * An agent with expertise in updating documentation.
   */
  readonly DOCS_AGENT: TestAgent;
  /**
   * An agent with expertise in writing and updating tests.
   */
  readonly TESTING_AGENT: TestAgent;
  /**
   * An agent with expertise in database schemas, SQL, and creating database migrations.
   */
  readonly DATABASE_AGENT: TestAgent;
  /**
   * An agent with expertise in CSS, styling, and UI design.
   */
  readonly CSS_AGENT: TestAgent;
  /**
   * An agent with expertise in internationalization and translations.
   */
  readonly I18N_AGENT: TestAgent;
  /**
   * An agent with expertise in security audits and vulnerability patches.
   */
  readonly SECURITY_AGENT: TestAgent;
  /**
   * An agent with expertise in CI/CD, Docker, and deployment scripts.
   */
  readonly DEVOPS_AGENT: TestAgent;
  /**
   * An agent with expertise in tracking, analytics, and metrics.
   */
  readonly ANALYTICS_AGENT: TestAgent;
  /**
   * An agent with expertise in web accessibility and ARIA roles.
   */
  readonly ACCESSIBILITY_AGENT: TestAgent;
  /**
   * An agent with expertise in React Native and mobile app development.
   */
  readonly MOBILE_AGENT: TestAgent;
};
