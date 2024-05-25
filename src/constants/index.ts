/**
 * Template list
 */
export const Templates = ["blank", "tailwind"];

/**
 * Language list
 */
export const Languages = ["typescript", "javascript"];

/**
 * State manager list
 */
export const StateManagers = ["blank", "gx", "redux"];

/**
 * Tools list
 */
export const Tools = ["eslint", "prettier"];

/**
 * Version list with stable and beta
 */
export const Versions: {
  stable: string | null;
  beta: string;
} = {
  stable: null,
  beta: "1.0.0-beta.14",
};