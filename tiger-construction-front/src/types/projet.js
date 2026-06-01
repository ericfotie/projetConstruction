/**
 * @typedef {'ETUDE' | 'EN_COURS' | 'TERMINE'} StatutProjet
 */

/**
 * @typedef {Object} ProjetHomeDTO
 * @property {string} titre
 * @property {string} localisation
 * @property {string|null} coverUrl
 * @property {string} categorieNom
 */

/**
 * @typedef {Object} PhotoDTO
 * @property {number} id
 * @property {string} url
 * @property {string} legende
 * @property {boolean} principale
 */

/**
 * @typedef {Object} PlanDTO
 * @property {number} id
 * @property {string} nomDocument
 * @property {string} fichierUrl
 * @property {string} typeTechnique
 * @property {string} indiceRevision
 */

/**
 * @typedef {Object} ProjetResponseDTO
 * @property {string} titre
 * @property {string} description
 * @property {string} localisation
 * @property {StatutProjet} statut
 * @property {string} categorieNom
 * @property {PhotoDTO[]} photos
 * @property {PlanDTO[]} plans
 */

/**
 * @typedef {Object} ProjetRequestDTO
 * @property {string} titre
 * @property {string} description
 * @property {string} localisation
 * @property {number} budgetEstime
 * @property {StatutProjet} statut
 * @property {number} categorieId
 */

// Ton code JavaScript (fonctions, API fetch, etc.) peut continuer ici sans erreur...