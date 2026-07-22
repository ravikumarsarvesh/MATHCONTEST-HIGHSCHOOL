// ═══════════════════════════════════════════════════════════
// DATA LOADER — Dynamically loads contest data from registry
// ═══════════════════════════════════════════════════════════
// This module reads MATH_ARENA_REGISTRY and provides helper
// functions for the app to access contest data dynamically.
// ═══════════════════════════════════════════════════════════
(function() {
  'use strict';

  // Storage for loaded yearly data
  window.MATH_ARENA_DATA = window.MATH_ARENA_DATA || {};

  var registry = null;
  var base = 'https://cemc.uwaterloo.ca/sites/default/files/documents/';

  // Known folder mappings for CEMC URL restructuring
  var folderOverrides = {
    pascal: {2017:2026, 2018:2026, 2019:2026},
    cayley: {2016:2025, 2017:2026, 2018:2026, 2019:2026},
    fermat: {2015:2024, 2017:2026, 2018:2026},
    euclid: {2017:2025, 2018:2024}
  };
  var solutionFolderOverrides = {
    pascal: {2024:2026},
    cayley: {},
    fermat: {2018:2025},
    euclid: {2017:2024, 2018:2024, 2020:2025}
  };

  // Special cases
  var specialContestUrls = {
    'cayley-2015': 'papers/2015CayleyContest.html'
  };

  function getRegistry() {
    if (!registry && window.MATH_ARENA_REGISTRY) {
      registry = window.MATH_ARENA_REGISTRY;
    }
    return registry;
  }

  function getContestFolder(contest, year) {
    var overrides = folderOverrides[contest] || {};
    return overrides[year] || year;
  }

  function getSolutionFolder(contest, year) {
    var overrides = solutionFolderOverrides[contest] || {};
    return overrides[year] || year;
  }

  function getContestName(contest) {
    return contest.charAt(0).toUpperCase() + contest.slice(1);
  }

  function getPaperUrl(contest, year) {
    var key = contest + '-' + year;
    if (specialContestUrls[key]) return specialContestUrls[key];
    var folder = getContestFolder(contest, year);
    return base + folder + '/' + year + getContestName(contest) + 'Contest.html';
  }

  function getSolutionUrl(contest, year) {
    var folder = getSolutionFolder(contest, year);
    return base + folder + '/' + year + getContestName(contest) + 'Solution.html';
  }

  function getDifficulty(year) {
    if (year >= 2024) return 'hard';
    if (year >= 2021) return 'medium';
    return 'easy';
  }

  // Public API
  window.MathArenaDataLoader = {
    /**
     * Get all available years for a contest (sorted newest first)
     */
    getAvailableYears: function(contest) {
      var reg = getRegistry();
      if (!reg || !reg.contests[contest]) return [];
      return reg.contests[contest].years.slice().sort(function(a,b){ return b - a; });
    },

    /**
     * Get all contest keys
     */
    getContests: function() {
      var reg = getRegistry();
      if (!reg) return [];
      return Object.keys(reg.contests);
    },

    /**
     * Get contest metadata (name, grade, type, etc.)
     */
    getContestInfo: function(contest) {
      var reg = getRegistry();
      if (!reg || !reg.contests[contest]) return null;
      return reg.contests[contest];
    },

    /**
     * Get paper and solution URLs for a contest/year
     */
    getSolutionLinks: function(contest, year) {
      return {
        paperUrl: getPaperUrl(contest, year),
        solutionUrl: getSolutionUrl(contest, year)
      };
    },

    /**
     * Get PAPERS array compatible with existing app format
     */
    getPapersArray: function(contest) {
      var years = this.getAvailableYears(contest);
      return years.map(function(y) {
        return {
          year: y,
          contest: getPaperUrl(contest, y),
          solution: getSolutionUrl(contest, y),
          difficulty: getDifficulty(y)
        };
      });
    },

    /**
     * Build the full PAPERS object for all contests
     */
    buildPapers: function() {
      var papers = {};
      var contests = this.getContests();
      for (var i = 0; i < contests.length; i++) {
        papers[contests[i]] = this.getPapersArray(contests[i]);
      }
      return papers;
    },

    /**
     * Get contest year data if loaded
     */
    getContestYearData: function(contest, year) {
      var key = contest + '-' + year;
      return window.MATH_ARENA_DATA[key] || null;
    },

    /**
     * Check if a contest/year exists in registry
     */
    yearExists: function(contest, year) {
      var reg = getRegistry();
      if (!reg || !reg.contests[contest]) return false;
      return reg.contests[contest].years.indexOf(year) !== -1;
    },

    /**
     * Get all questions for a contest from QB (existing format)
     */
    getAllQuestions: function(contest) {
      if (typeof QB === 'undefined') return [];
      return QB.filter(function(q) { return q.c === contest; });
    },

    /**
     * Get questions for a specific year
     */
    getYearQuestions: function(contest, year) {
      if (typeof QB === 'undefined') return [];
      return QB.filter(function(q) { return q.c === contest && q.year === year; });
    },

    /**
     * Get mixed practice questions with filters
     */
    getMixedPracticeQuestions: function(filters) {
      if (typeof QB === 'undefined') return [];
      var qs = QB.slice();
      if (filters.contest && filters.contest !== 'mixed') {
        qs = qs.filter(function(q) { return q.c === filters.contest; });
      }
      if (filters.difficulty && filters.difficulty !== 'mixed') {
        qs = qs.filter(function(q) { return q.d === filters.difficulty; });
      }
      if (filters.year) {
        qs = qs.filter(function(q) { return q.year === filters.year; });
      }
      return qs;
    }
  };

})();
