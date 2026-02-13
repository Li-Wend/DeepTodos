#!/usr/bin/env python
"""
Test runner script for FastAPI authentication tests.

This script provides a convenient way to run tests with different configurations.

Usage:
    python run_tests.py                 # Run all tests
    python run_tests.py --verbose       # Run with verbose output
    python run_tests.py --coverage      # Run with coverage report
    python run_tests.py --specific TestUserRegistration  # Run specific test class
"""

import subprocess
import sys
import argparse
from pathlib import Path
import os
from typing import Optional


def run_tests(
    test_path: str = "tests/",
    verbose: bool = False,
    coverage: bool = False,
    specific: Optional[str] = None,
    markers: Optional[str] = None,
    stop_on_first_failure: bool = False,
    show_output: bool = False,
) -> int:
    """
    Run pytest with specified options.
    
    Args:
        test_path: Path to test directory or specific test file
        verbose: Show detailed test output
        coverage: Generate coverage report
        specific: Specific test class or method to run
        markers: Run tests matching specific markers
        stop_on_first_failure: Stop on first failure (-x flag)
        show_output: Show print statements and logging
    
    Returns:
        Exit code from pytest
    """
    cmd = ["uv", "run", "pytest"]
    
    # Add test path
    if specific:
        cmd.append(f"tests/{specific}")
    else:
        cmd.append(test_path)
    
    # Add flags
    if verbose:
        cmd.append("-v")
    
    if show_output:
        cmd.append("-s")
    
    if stop_on_first_failure:
        cmd.append("-x")
    
    if coverage:
        cmd.extend([
            "--cov=src.authentication",
            "--cov-report=html",
            "--cov-report=term-missing",
        ])
    
    if markers:
        cmd.extend(["-m", markers])
    
    print(f"Running: {' '.join(cmd)}")
    print("-" * 80)
    
    # Use call for better cross-platform compatibility
    try:
        exit_code = subprocess.call(cmd)
    except FileNotFoundError:
        print(f"Error: pytest not found. Make sure to install it with: uv pip install pytest")
        return 1
    
    return exit_code


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Run FastAPI authentication tests",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_tests.py                           # Run all tests
  python run_tests.py --verbose                 # Verbose output
  python run_tests.py --coverage                # With coverage report
  python run_tests.py --specific TestUserLogin  # Run specific test class
  python run_tests.py --show-output             # Show print statements
  python run_tests.py --fast -x                 # Stop on first failure
        """,
    )
    
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show detailed output for each test",
    )
    parser.add_argument(
        "--coverage",
        "-c",
        action="store_true",
        help="Generate coverage report",
    )
    parser.add_argument(
        "--specific",
        "-s",
        type=str,
        help="Run specific test class (e.g., TestUserRegistration)",
    )
    parser.add_argument(
        "--markers",
        "-m",
        type=str,
        help="Run tests matching specific markers (e.g., 'asyncio')",
    )
    parser.add_argument(
        "--stop-on-failure",
        "-x",
        action="store_true",
        help="Stop on first failure",
    )
    parser.add_argument(
        "--show-output",
        "-o",
        action="store_true",
        help="Show print statements and logging output",
    )
    parser.add_argument(
        "--fast",
        action="store_true",
        help="Run tests in fast mode (equivalent to -x)",
    )
    
    args = parser.parse_args()
    
    # Check if tests directory exists
    if not Path("tests").exists():
        print("Error: tests/ directory not found. Please run from project root.")
        return 1
    
    # Run tests
    exit_code = run_tests(
        verbose=args.verbose,
        coverage=args.coverage,
        specific=args.specific,
        markers=args.markers,
        stop_on_first_failure=args.stop_on_failure or args.fast,
        show_output=args.show_output,
    )
    
    if exit_code == 0:
        print("\n" + "=" * 80)
        print("[PASS] All tests passed!")
        print("=" * 80)
    else:
        print("\n" + "=" * 80)
        print("[FAIL] Some tests failed!")
        print("=" * 80)
    
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
