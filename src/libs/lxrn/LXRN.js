/**
 * @fileoverview LXRN - Learning eXperience Reference Number System
 * @module LXRN
 * @namespace LXRN
 * @memberof LXRN
 * 
 * @description
 * The main LXRN module providing learning experience management capabilities.
 * Architecture, this module handles learning experiences,
 * collections, paths, and utilities for educational content management.
 * 
 * @author LXRN Team
 * @version 1.0.0
 * @license MIT
 * @see https://github.com/luxarionadm-design/Eocs
 * 
 * @example
 * import LXRN from '@lxrn/core';
 * 
 * // Create a learning experience
 * const learning = new LXRN.LearningExperience({
 *   category: LXRN.Categories.MATH,
 *   title: 'Calculus Fundamentals'
 * });
 * 
 * // Add to collection
 * const collection = new LXRN.Collection();
 * collection.add(learning);
 * 
 * // Get statistics
 * const stats = collection.getStats();
 * console.log(stats);
 */

/**
 * LXRN - Main namespace object
 * @namespace LXRN
 */
const LXRN = {};

/**
 * LXRN version number following semantic versioning
 * @type {string}
 * @default '1.0.0'
 */
LXRN.VERSION = '1.0.0';

/**
 * LXRN Categories - Learning categories
 * @type {Object}
 */
LXRN.Categories = {
  CORE: 'CORE',
  MATH: 'MATH',
  PHYSICS: 'PHYS',
  CHEMISTRY: 'CHEM',
  BIOLOGY: 'BIO',
  COMPUTER: 'COMP',
  ENGINEERING: 'ENG',
  LANGUAGE: 'LANG',
  ART: 'ART',
  MUSIC: 'MUSIC',
  HISTORY: 'HIST',
  GEOGRAPHY: 'GEO',
  PHILOSOPHY: 'PHIL',
  PSYCHOLOGY: 'PSYCH',
  SOCIOLOGY: 'SOC',
  ECONOMICS: 'ECON',
  BUSINESS: 'BUS',
  HEALTH: 'HEALTH',
  SPORTS: 'SPORT',
  TECHNOLOGY: 'TECH'
};

/**
 * LXRN Levels - Learning difficulty levels
 * @type {Object}
 */
LXRN.Levels = {
  BEGINNER: 'BEG',
  INTERMEDIATE: 'INT',
  ADVANCED: 'ADV',
  EXPERT: 'EXP',
  MASTER: 'MST'
};

/**
 * LXRN Status - Learning progress status
 * @type {Object}
 */
LXRN.Status = {
  NOT_STARTED: 'NS',
  IN_PROGRESS: 'IP',
  COMPLETED: 'CMP',
  MASTERED: 'MST',
  NEEDS_REVIEW: 'NR',
  ARCHIVED: 'ARC'
};

/**
 * LXRN Types - Learning content types
 * @type {Object}
 */
LXRN.Types = {
  CONCEPT: 'CON',
  SKILL: 'SKI',
  KNOWLEDGE: 'KNW',
  PRACTICAL: 'PRC',
  THEORETICAL: 'THR',
  PROJECT: 'PRJ',
  EXERCISE: 'EXR',
  ASSESSMENT: 'ASS'
};

/**
 * LXRN.Utils - Utility functions for LXRN
 * @namespace LXRN.Utils
 */
LXRN.Utils = {};

/**
 * Generate a unique LXRN ID
 * @param {string} [prefix='LXRN'] - ID prefix
 * @param {string} [separator='-'] - Separator character
 * @returns {string} Unique ID
 */
LXRN.Utils.generateId = function(prefix = 'LXRN', separator = '-') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${separator}${timestamp}${separator}${random}`;
};

/**
 * Validate an LXRN ID
 * @param {string} id - ID to validate
 * @param {string} [prefix='LXRN'] - Expected prefix
 * @param {string} [separator='-'] - Expected separator
 * @returns {boolean} True if valid
 */
LXRN.Utils.validateId = function(id, prefix = 'LXRN', separator = '-') {
  const pattern = new RegExp(`^${prefix}\\${separator}[A-Z0-9]+\\${separator}[A-Z0-9]{6}$`);
  return pattern.test(id);
};

/**
 * Format duration in minutes to human readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Human readable duration
 */
LXRN.Utils.formatDuration = function(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

/**
 * Format progress as percentage
 * @param {number} progress - Progress value (0-1)
 * @returns {string} Formatted percentage
 */
LXRN.Utils.formatProgress = function(progress) {
  return `${Math.round(progress * 100)}%`;
};

/**
 * Format date to ISO string
 * @param {Date} date - Date to format
 * @returns {string|null} ISO string or null
 */
LXRN.Utils.formatDate = function(date) {
  return date ? date.toISOString() : null;
};

/**
 * Parse date from string
 * @param {string} str - Date string
 * @returns {Date|null} Parsed date or null
 */
LXRN.Utils.parseDate = function(str) {
  return str ? new Date(str) : null;
};

/**
 * Check if a category is valid
 * @param {string} category - Category to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidCategory = function(category) {
  return Object.values(LXRN.Categories).includes(category);
};

/**
 * Check if a level is valid
 * @param {string} level - Level to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidLevel = function(level) {
  return Object.values(LXRN.Levels).includes(level);
};

/**
 * Check if a status is valid
 * @param {string} status - Status to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidStatus = function(status) {
  return Object.values(LXRN.Status).includes(status);
};

/**
 * Check if a type is valid
 * @param {string} type - Type to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidType = function(type) {
  return Object.values(LXRN.Types).includes(type);
};

/**
 * Check if progress is valid
 * @param {number} progress - Progress to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidProgress = function(progress) {
  return typeof progress === 'number' && progress >= 0 && progress <= 1;
};

/**
 * Check if score is valid
 * @param {number} score - Score to check
 * @returns {boolean} True if valid
 */
LXRN.Utils.isValidScore = function(score) {
  return typeof score === 'number' && score >= 0 && score <= 100;
};

/**
 * Get category name from code
 * @param {string} category - Category code
 * @returns {string} Category name
 */
LXRN.Utils.getCategoryName = function(category) {
  const names = {
    CORE: 'Core Concepts',
    MATH: 'Mathematics',
    PHYS: 'Physics',
    CHEM: 'Chemistry',
    BIO: 'Biology',
    COMP: 'Computer Science',
    ENG: 'Engineering',
    LANG: 'Language',
    ART: 'Art',
    MUSIC: 'Music',
    HIST: 'History',
    GEO: 'Geography',
    PHIL: 'Philosophy',
    PSYCH: 'Psychology',
    SOC: 'Sociology',
    ECON: 'Economics',
    BUS: 'Business',
    HEALTH: 'Health',
    SPORT: 'Sports',
    TECH: 'Technology'
  };
  return names[category] || 'Unknown';
};

/**
 * Get level name from code
 * @param {string} level - Level code
 * @returns {string} Level name
 */
LXRN.Utils.getLevelName = function(level) {
  const names = {
    BEG: 'Beginner',
    INT: 'Intermediate',
    ADV: 'Advanced',
    EXP: 'Expert',
    MST: 'Master'
  };
  return names[level] || 'Unknown';
};

/**
 * Get status name from code
 * @param {string} status - Status code
 * @returns {string} Status name
 */
LXRN.Utils.getStatusName = function(status) {
  const names = {
    NS: 'Not Started',
    IP: 'In Progress',
    CMP: 'Completed',
    MST: 'Mastered',
    NR: 'Needs Review',
    ARC: 'Archived'
  };
  return names[status] || 'Unknown';
};

/**
 * Get type name from code
 * @param {string} type - Type code
 * @returns {string} Type name
 */
LXRN.Utils.getTypeName = function(type) {
  const names = {
    CON: 'Concept',
    SKI: 'Skill',
    KNW: 'Knowledge',
    PRC: 'Practical',
    THR: 'Theoretical',
    PRJ: 'Project',
    EXR: 'Exercise',
    ASS: 'Assessment'
  };
  return names[type] || 'Unknown';
};

/**
 * LXRN.LearningExperience - Main learning experience class
 * @class
 */
LXRN.LearningExperience = class {
  /**
   * Create a new Learning Experience
   * @param {Object} params - Parameters
   * @param {string} [params.id=null] - Custom ID
   * @param {string} [params.category=LXRN.Categories.CORE] - Category
   * @param {string} [params.level=LXRN.Levels.BEGINNER] - Level
   * @param {string} [params.status=LXRN.Status.NOT_STARTED] - Status
   * @param {string} [params.type=LXRN.Types.CONCEPT] - Type
   * @param {string} [params.title=''] - Title
   * @param {string} [params.description=''] - Description
   * @param {number} [params.duration=0] - Duration in minutes
   * @param {Array} [params.prerequisites=[]] - Prerequisite IDs
   * @param {Array} [params.learningOutcomes=[]] - Learning outcomes
   * @param {Array} [params.tags=[]] - Tags
   * @param {number} [params.progress=0] - Progress (0-1)
   * @param {number} [params.score=0] - Score (0-100)
   * @param {Object} [params.metadata={}] - Metadata
   * @param {string} [params.author=''] - Author
   * @param {string} [params.url=''] - URL
   * @param {string} [params.image=''] - Image URL
   * @param {number} [params.rating=0] - Rating (0-5)
   * @param {number} [params.reviews=0] - Number of reviews
   * @param {number} [params.difficulty=5] - Difficulty (1-10)
   */
  constructor({
    id = null,
    category = LXRN.Categories.CORE,
    level = LXRN.Levels.BEGINNER,
    status = LXRN.Status.NOT_STARTED,
    type = LXRN.Types.CONCEPT,
    title = '',
    description = '',
    duration = 0,
    prerequisites = [],
    learningOutcomes = [],
    tags = [],
    progress = 0,
    score = 0,
    metadata = {},
    author = '',
    url = '',
    image = '',
    rating = 0,
    reviews = 0,
    difficulty = 5
  } = {}) {
    this._id = id || LXRN.Utils.generateId();
    this._category = category;
    this._level = level;
    this._status = status;
    this._type = type;
    this._title = title;
    this._description = description;
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._completedAt = null;
    this._duration = duration;
    this._prerequisites = prerequisites;
    this._learningOutcomes = learningOutcomes;
    this._tags = tags;
    this._progress = progress;
    this._score = score;
    this._metadata = metadata;
    this._version = '1.0.0';
    this._author = author;
    this._url = url;
    this._image = image;
    this._rating = rating;
    this._reviews = reviews;
    this._difficulty = difficulty;
  }

  /**
   * Get the ID
   * @returns {string} ID
   */
  getId() { return this._id; }

  /**
   * Get the category
   * @returns {string} Category
   */
  getCategory() { return this._category; }

  /**
   * Set the category
   * @param {string} category - Category
   */
  setCategory(category) { this._category = category; this._updateTimestamp(); }

  /**
   * Get the level
   * @returns {string} Level
   */
  getLevel() { return this._level; }

  /**
   * Set the level
   * @param {string} level - Level
   */
  setLevel(level) { this._level = level; this._updateTimestamp(); }

  /**
   * Get the status
   * @returns {string} Status
   */
  getStatus() { return this._status; }

  /**
   * Set the status
   * @param {string} status - Status
   */
  setStatus(status) { 
    this._status = status; 
    if (status === LXRN.Status.COMPLETED || status === LXRN.Status.MASTERED) {
      this._completedAt = new Date();
    }
    this._updateTimestamp(); 
  }

  /**
   * Get the type
   * @returns {string} Type
   */
  getType() { return this._type; }

  /**
   * Set the type
   * @param {string} type - Type
   */
  setType(type) { this._type = type; this._updateTimestamp(); }

  /**
   * Get the title
   * @returns {string} Title
   */
  getTitle() { return this._title; }

  /**
   * Set the title
   * @param {string} title - Title
   */
  setTitle(title) { this._title = title; this._updateTimestamp(); }

  /**
   * Get the description
   * @returns {string} Description
   */
  getDescription() { return this._description; }

  /**
   * Set the description
   * @param {string} description - Description
   */
  setDescription(description) { this._description = description; this._updateTimestamp(); }

  /**
   * Get the creation date
   * @returns {Date} Creation date
   */
  getCreatedAt() { return this._createdAt; }

  /**
   * Get the last update date
   * @returns {Date} Last update date
   */
  getUpdatedAt() { return this._updatedAt; }

  /**
   * Get the completion date
   * @returns {Date|null} Completion date or null
   */
  getCompletedAt() { return this._completedAt; }

  /**
   * Get the duration in minutes
   * @returns {number} Duration in minutes
   */
  getDuration() { return this._duration; }

  /**
   * Set the duration
   * @param {number} duration - Duration in minutes
   */
  setDuration(duration) { this._duration = duration; this._updateTimestamp(); }

  /**
   * Get prerequisites
   * @returns {Array} Prerequisites
   */
  getPrerequisites() { return [...this._prerequisites]; }

  /**
   * Get learning outcomes
   * @returns {Array} Learning outcomes
   */
  getLearningOutcomes() { return [...this._learningOutcomes]; }

  /**
   * Get tags
   * @returns {Array} Tags
   */
  getTags() { return [...this._tags]; }

  /**
   * Get progress (0-1)
   * @returns {number} Progress
   */
  getProgress() { return this._progress; }

  /**
   * Set progress
   * @param {number} progress - Progress (0-1)
   */
  setProgress(progress) { 
    this._progress = Math.max(0, Math.min(1, progress));
    if (this._progress === 1 && this._status !== LXRN.Status.COMPLETED) {
      this.setStatus(LXRN.Status.COMPLETED);
    }
    this._updateTimestamp(); 
  }

  /**
   * Get score (0-100)
   * @returns {number} Score
   */
  getScore() { return this._score; }

  /**
   * Set score
   * @param {number} score - Score (0-100)
   */
  setScore(score) { this._score = Math.max(0, Math.min(100, score)); this._updateTimestamp(); }

  /**
   * Get metadata
   * @returns {Object} Metadata
   */
  getMetadata() { return { ...this._metadata }; }

  /**
   * Set metadata
   * @param {Object} metadata - Metadata
   */
  setMetadata(metadata) { this._metadata = { ...metadata }; this._updateTimestamp(); }

  /**
   * Get version
   * @returns {string} Version
   */
  getVersion() { return this._version; }

  /**
   * Get author
   * @returns {string} Author
   */
  getAuthor() { return this._author; }

  /**
   * Set author
   * @param {string} author - Author
   */
  setAuthor(author) { this._author = author; this._updateTimestamp(); }

  /**
   * Get URL
   * @returns {string} URL
   */
  getUrl() { return this._url; }

  /**
   * Set URL
   * @param {string} url - URL
   */
  setUrl(url) { this._url = url; this._updateTimestamp(); }

  /**
   * Get image URL
   * @returns {string} Image URL
   */
  getImage() { return this._image; }

  /**
   * Set image URL
   * @param {string} image - Image URL
   */
  setImage(image) { this._image = image; this._updateTimestamp(); }

  /**
   * Get rating (0-5)
   * @returns {number} Rating
   */
  getRating() { return this._rating; }

  /**
   * Set rating
   * @param {number} rating - Rating (0-5)
   */
  setRating(rating) { this._rating = Math.max(0, Math.min(5, rating)); this._updateTimestamp(); }

  /**
   * Get number of reviews
   * @returns {number} Reviews
   */
  getReviews() { return this._reviews; }

  /**
   * Set reviews
   * @param {number} reviews - Reviews
   */
  setReviews(reviews) { this._reviews = reviews; this._updateTimestamp(); }

  /**
   * Get difficulty (1-10)
   * @returns {number} Difficulty
   */
  getDifficulty() { return this._difficulty; }

  /**
   * Set difficulty
   * @param {number} difficulty - Difficulty (1-10)
   */
  setDifficulty(difficulty) { this._difficulty = Math.max(1, Math.min(10, difficulty)); this._updateTimestamp(); }

  /**
   * Add a prerequisite
   * @param {string} prerequisite - Prerequisite ID
   */
  addPrerequisite(prerequisite) {
    if (!this._prerequisites.includes(prerequisite)) {
      this._prerequisites.push(prerequisite);
      this._updateTimestamp();
    }
  }

  /**
   * Remove a prerequisite
   * @param {string} prerequisite - Prerequisite ID
   */
  removePrerequisite(prerequisite) {
    this._prerequisites = this._prerequisites.filter(p => p !== prerequisite);
    this._updateTimestamp();
  }

  /**
   * Add a learning outcome
   * @param {string} outcome - Learning outcome
   */
  addLearningOutcome(outcome) {
    if (!this._learningOutcomes.includes(outcome)) {
      this._learningOutcomes.push(outcome);
      this._updateTimestamp();
    }
  }

  /**
   * Remove a learning outcome
   * @param {string} outcome - Learning outcome
   */
  removeLearningOutcome(outcome) {
    this._learningOutcomes = this._learningOutcomes.filter(o => o !== outcome);
    this._updateTimestamp();
  }

  /**
   * Add a tag
   * @param {string} tag - Tag
   */
  addTag(tag) {
    if (!this._tags.includes(tag)) {
      this._tags.push(tag);
      this._updateTimestamp();
    }
  }

  /**
   * Remove a tag
   * @param {string} tag - Tag
   */
  removeTag(tag) {
    this._tags = this._tags.filter(t => t !== tag);
    this._updateTimestamp();
  }

  /**
   * Add metadata
   * @param {string} key - Metadata key
   * @param {*} value - Metadata value
   */
  addMetadata(key, value) {
    this._metadata[key] = value;
    this._updateTimestamp();
  }

  /**
   * Remove metadata
   * @param {string} key - Metadata key
   */
  removeMetadata(key) {
    delete this._metadata[key];
    this._updateTimestamp();
  }

  /**
   * Add a review
   * @param {number} rating - Rating (0-5)
   */
  addReview(rating) {
    const totalRating = this._rating * this._reviews;
    this._reviews++;
    this._rating = (totalRating + Math.max(0, Math.min(5, rating))) / this._reviews;
    this._updateTimestamp();
  }

  /**
   * Update timestamp (internal)
   * @private
   */
  _updateTimestamp() {
    this._updatedAt = new Date();
  }

  /**
   * Clone this learning experience
   * @returns {LXRN.LearningExperience} Cloned instance
   */
  clone() {
    return new LXRN.LearningExperience({
      id: this._id,
      category: this._category,
      level: this._level,
      status: this._status,
      type: this._type,
      title: this._title,
      description: this._description,
      duration: this._duration,
      prerequisites: this._prerequisites,
      learningOutcomes: this._learningOutcomes,
      tags: this._tags,
      progress: this._progress,
      score: this._score,
      metadata: this._metadata,
      author: this._author,
      url: this._url,
      image: this._image,
      rating: this._rating,
      reviews: this._reviews,
      difficulty: this._difficulty
    });
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      id: this._id,
      category: this._category,
      level: this._level,
      status: this._status,
      type: this._type,
      title: this._title,
      description: this._description,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
      completedAt: this._completedAt ? this._completedAt.toISOString() : null,
      duration: this._duration,
      prerequisites: this._prerequisites,
      learningOutcomes: this._learningOutcomes,
      tags: this._tags,
      progress: this._progress,
      score: this._score,
      metadata: this._metadata,
      version: this._version,
      author: this._author,
      url: this._url,
      image: this._image,
      rating: this._rating,
      reviews: this._reviews,
      difficulty: this._difficulty
    };
  }

  /**
   * Create from JSON
   * @param {Object} json - JSON data
   * @returns {LXRN.LearningExperience} LXRN instance
   */
  static fromJSON(json) {
    const lxrn = new LXRN.LearningExperience({
      id: json.id,
      category: json.category,
      level: json.level,
      status: json.status,
      type: json.type,
      title: json.title,
      description: json.description,
      duration: json.duration,
      prerequisites: json.prerequisites,
      learningOutcomes: json.learningOutcomes,
      tags: json.tags,
      progress: json.progress,
      score: json.score,
      metadata: json.metadata,
      author: json.author,
      url: json.url,
      image: json.image,
      rating: json.rating,
      reviews: json.reviews,
      difficulty: json.difficulty
    });
    lxrn._createdAt = new Date(json.createdAt);
    lxrn._updatedAt = new Date(json.updatedAt);
    if (json.completedAt) {
      lxrn._completedAt = new Date(json.completedAt);
    }
    return lxrn;
  }
};

/**
 * LXRN.Collection - Collection manager for learning experiences
 * @class
 */
LXRN.Collection = class {
  /**
   * Create a new collection
   */
  constructor() {
    this._experiences = new Map();
    this._listeners = [];
  }

  /**
   * Add a learning experience
   * @param {LXRN.LearningExperience} experience - Learning experience
   * @returns {LXRN.Collection} This instance for chaining
   */
  add(experience) {
    if (!(experience instanceof LXRN.LearningExperience)) {
      throw new Error('Invalid learning experience');
    }
    this._experiences.set(experience.getId(), experience);
    this._notify('add', experience);
    return this;
  }

  /**
   * Get a learning experience by ID
   * @param {string} id - LXRN ID
   * @returns {LXRN.LearningExperience|null} Learning experience or null
   */
  get(id) {
    return this._experiences.get(id) || null;
  }

  /**
   * Remove a learning experience
   * @param {string} id - LXRN ID
   * @returns {boolean} True if removed
   */
  remove(id) {
    const experience = this._experiences.get(id);
    if (experience) {
      this._experiences.delete(id);
      this._notify('remove', experience);
      return true;
    }
    return false;
  }

  /**
   * Get all learning experiences
   * @returns {Array} Array of learning experiences
   */
  getAll() {
    return Array.from(this._experiences.values());
  }

  /**
   * Get count of experiences
   * @returns {number} Count
   */
  count() {
    return this._experiences.size;
  }

  /**
   * Clear all experiences
   */
  clear() {
    this._experiences.clear();
    this._notify('clear', null);
  }

  /**
   * Filter experiences
   * @param {Function} predicate - Filter function
   * @returns {Array} Filtered array
   */
  filter(predicate) {
    return this.getAll().filter(predicate);
  }

  /**
   * Find experiences by category
   * @param {string} category - Category
   * @returns {Array} Matching experiences
   */
  findByCategory(category) {
    return this.filter(e => e.getCategory() === category);
  }

  /**
   * Find experiences by level
   * @param {string} level - Level
   * @returns {Array} Matching experiences
   */
  findByLevel(level) {
    return this.filter(e => e.getLevel() === level);
  }

  /**
   * Find experiences by status
   * @param {string} status - Status
   * @returns {Array} Matching experiences
   */
  findByStatus(status) {
    return this.filter(e => e.getStatus() === status);
  }

  /**
   * Find experiences by tag
   * @param {string} tag - Tag
   * @returns {Array} Matching experiences
   */
  findByTag(tag) {
    return this.filter(e => e.getTags().includes(tag));
  }

  /**
   * Find experiences by type
   * @param {string} type - Type
   * @returns {Array} Matching experiences
   */
  findByType(type) {
    return this.filter(e => e.getType() === type);
  }

  /**
   * Search experiences
   * @param {string} query - Search query
   * @returns {Array} Matching experiences
   */
  search(query) {
    const q = query.toLowerCase();
    return this.filter(e => 
      e.getTitle().toLowerCase().includes(q) ||
      e.getDescription().toLowerCase().includes(q) ||
      e.getTags().some(t => t.toLowerCase().includes(q))
    );
  }

  /**
   * Get statistics
   * @returns {Object} Statistics
   */
  getStats() {
    const experiences = this.getAll();
    const total = experiences.length;
    const completed = experiences.filter(e => 
      e.getStatus() === LXRN.Status.COMPLETED || 
      e.getStatus() === LXRN.Status.MASTERED
    ).length;
    const inProgress = experiences.filter(e => 
      e.getStatus() === LXRN.Status.IN_PROGRESS
    ).length;
    const averageProgress = experiences.reduce((sum, e) => sum + e.getProgress(), 0) / total || 0;
    const averageScore = experiences.reduce((sum, e) => sum + e.getScore(), 0) / total || 0;
    
    const categories = {};
    experiences.forEach(e => {
      const cat = e.getCategory();
      categories[cat] = (categories[cat] || 0) + 1;
    });

    const tags = {};
    experiences.forEach(e => {
      e.getTags().forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });
    });

    return {
      total,
      completed,
      inProgress,
      averageProgress,
      averageScore,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      categories,
      tags
    };
  }

  /**
   * Add a listener
   * @param {Function} listener - Listener function
   */
  addListener(listener) {
    this._listeners.push(listener);
  }

  /**
   * Remove a listener
   * @param {Function} listener - Listener function
   */
  removeListener(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  /**
   * Notify listeners (internal)
   * @param {string} event - Event name
   * @param {*} data - Event data
   * @private
   */
  _notify(event, data) {
    this._listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Listener error:', error);
      }
    });
  }

  /**
   * Convert to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      experiences: this.getAll().map(e => e.toJSON()),
      stats: this.getStats()
    };
  }

  /**
   * Create from JSON
   * @param {Object} json - JSON data
   * @returns {LXRN.Collection} Collection instance
   */
  static fromJSON(json) {
    const collection = new LXRN.Collection();
    json.experiences.forEach(data => {
      collection.add(LXRN.LearningExperience.fromJSON(data));
    });
    return collection;
  }
};

/**
 * LXRN.Factory - Factory for creating learning experiences
 * @type {Object}
 */
LXRN.Factory = {
  /**
   * Create a concept learning experience
   * @param {string} title - Title
   * @param {string} description - Description
   * @param {Object} options - Additional options
   * @returns {LXRN.LearningExperience} Learning experience
   */
  createConcept: function(title, description, options = {}) {
    return new LXRN.LearningExperience({
      type: LXRN.Types.CONCEPT,
      title: title,
      description: description,
      ...options
    });
  },

  /**
   * Create a skill learning experience
   * @param {string} title - Title
   * @param {string} description - Description
   * @param {Object} options - Additional options
   * @returns {LXRN.LearningExperience} Learning experience
   */
  createSkill: function(title, description, options = {}) {
    return new LXRN.LearningExperience({
      type: LXRN.Types.SKILL,
      title: title,
      description: description,
      ...options
    });
  },

  /**
   * Create a project learning experience
   * @param {string} title - Title
   * @param {string} description - Description
   * @param {Object} options - Additional options
   * @returns {LXRN.LearningExperience} Learning experience
   */
  createProject: function(title, description, options = {}) {
    return new LXRN.LearningExperience({
      type: LXRN.Types.PROJECT,
      title: title,
      description: description,
      ...options
    });
  },

  /**
   * Create an exercise learning experience
   * @param {string} title - Title
   * @param {string} description - Description
   * @param {Object} options - Additional options
   * @returns {LXRN.LearningExperience} Learning experience
   */
  createExercise: function(title, description, options = {}) {
    return new LXRN.LearningExperience({
      type: LXRN.Types.EXERCISE,
      title: title,
      description: description,
      ...options
    });
  },

  /**
   * Create an assessment learning experience
   * @param {string} title - Title
   * @param {string} description - Description
   * @param {Object} options - Additional options
   * @returns {LXRN.LearningExperience} Learning experience
   */
  createAssessment: function(title, description, options = {}) {
    return new LXRN.LearningExperience({
      type: LXRN.Types.ASSESSMENT,
      title: title,
      description: description,
      ...options
    });
  }
};

/**
 * LXRN.Path - Learning path utilities
 * @type {Object}
 */
LXRN.Path = {
  /**
   * Create a learning path
   * @param {Array} experienceIds - Ordered list of experience IDs
   * @param {string} name - Path name
   * @param {string} [description=''] - Path description
   * @returns {Object} Path object
   */
  create: function(experienceIds, name, description = '') {
    return {
      id: LXRN.Utils.generateId('PATH'),
      name: name,
      description: description,
      experiences: [...experienceIds],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
};

export { LXRN };
export default LXRN;
