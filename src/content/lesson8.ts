import { Lesson } from './lessons';

export const lesson8: Lesson = {
  id: 8,
  slug: 'automated-testing-and-quality-gates',
  title: 'Automated Testing and Quality Gates',
  subtitle: 'The inspection station that stops broken code from reaching users',
  module: 2,
  duration: '30 min',
  difficulty: 'Intermediate',
  tags: ["Testing", "Quality Gates", "pytest", "Jest", "CI"],
  sections: [
    {
      type: 'objectives',
      title: 'What You Will Learn',
      items: ["See the lesson content for this topic's objectives"]
    },
    {
      type: 'explanation',
      title: 'Core Concept',
      content: 'Automated tests are organised in a pyramid:\n\n**Unit Tests (many, fast)**\nTest a single function or class in complete isolation. Run in milliseconds.\n\n**Integration Tests (fewer, slower)**\nTest how multiple components work together.\n\n**End-to-End Tests (fewest, slowest)**\nTest the complete user journey through a real browser or API. These can take minutes each.\n\nA **Quality Gate** is a standard below which the pipeline fails. If test coverage drops below 80%, the pipeline stops.'
    },
    {
      type: 'analogy',
      title: '🍔 Food Ordering Analogy',
      content: 'A well-run restaurant has multiple quality checkpoints:\n\n**Unit check (ingredient level):** Is this tomato fresh? Is the cheese properly sliced?\n\n**Integration check (dish level):** Do all the ingredients work together?\n\n**End-to-end check (order level):** Does the complete order match what the customer requested?\n\n**Quality gate:** Food temperature below 65°C → the order does not leave the kitchen. In software: test coverage below 80% → the pipeline fails.'
    },
    {
      type: 'code',
      title: 'Code Example',
      language: 'yaml',
      code: '# tests/test_orders.py\nimport pytest\nfrom fastapi.testclient import TestClient\nfrom src.main import app\n\nclient = TestClient(app)\n\n# Unit test: single function\ndef test_calculate_order_total():\n    from src.services.order import calculate_total\n    result = calculate_total([{"price": 10, "qty": 2}, {"price": 5, "qty": 1}])\n    assert result == 25.0\n\n# Integration test: API endpoint\ndef test_create_order_returns_201():\n    response = client.post("/orders", json={\n        "customer_name": "Alice",\n        "items": [{"name": "Burger", "price": 12.99, "qty": 1}]\n    })\n    assert response.status_code == 201\n    assert "order_id" in response.json()\n\n# Quality gate: coverage enforcement\n# pytest tests/ --cov=src --cov-fail-under=80'
    },
    {
      type: 'quiz',
      title: 'Knowledge Check',
      quizQuestions: [
        {
          id: 'l8q1',
          question: 'A test checks that a single `calculate_discount()` function returns the correct value. What type is this?',
          options: ["End-to-end test", "Integration test", "Unit test", "Smoke test"],
          correctIndex: 2,
          explanation: 'A unit test tests a single function or class in complete isolation.'
        },
        {
          id: 'l8q2',
          question: 'What does `--cov-fail-under=80` do in pytest?',
          options: ["Limits test execution to 80 seconds", "Runs only 80% of available tests", "Fails the pipeline if test coverage is below 80%", "Requires 80 passing tests to succeed"],
          correctIndex: 2,
          explanation: 'This flag makes pytest exit with a non-zero code if measured code coverage falls below 80%.'
        },
        {
          id: 'l8q3',
          question: 'Why are end-to-end tests at the TOP (fewest) of the testing pyramid?',
          options: ["They are less important than unit tests", "They take longer to write and run, so you should have fewer of them", "They only work on production servers", "They are only used for security testing"],
          correctIndex: 1,
          explanation: 'E2E tests are valuable but expensive — they spin up real browsers or services, take minutes to run, and can be flaky.'
        }
      ]
    },
    {
      type: 'summary',
      title: 'Key Takeaways',
      items: ['The testing pyramid: many fast unit tests → fewer integration tests → very few E2E tests', 'Quality gates enforce minimum standards: coverage, no security vulnerabilities, no lint errors', 'A failing test MUST stop the pipeline — otherwise tests are useless', 'Linters (flake8, ESLint) and type checkers (mypy, TypeScript) catch issues before runtime', 'Security dependency scanning should be a standard pipeline step']
    },
    {
      type: 'next-preview',
      title: 'Coming Up Next',
      content: 'Lesson 9 introduces Docker — the revolutionary packaging technology that creates immutable, portable application containers.'
    }
  ]
};
