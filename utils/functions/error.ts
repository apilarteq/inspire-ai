/**
 * Represents the input for the fetch error handler.
 */
interface FetchError {
  error: unknown;
  failedFetchMessage?: string;
  unexpectedErrorMessage?: string;
}

/**
 * Returns a user-friendly message for fetch-related errors.
 * @param params - An object containing the error and optional custom messages.
 * @returns A string with a human-readable error message.
 */
export function handleFetchError({
  error,
  failedFetchMessage,
  unexpectedErrorMessage,
}: FetchError): string {
  console.log(error);

  if (error instanceof TypeError) {
    return (
      failedFetchMessage ||
      "El servicio no está disponible en este momento. Inténtalo más tarde."
    );
  }

  return unexpectedErrorMessage || "Ha ocurrido un error inesperado.";
}
