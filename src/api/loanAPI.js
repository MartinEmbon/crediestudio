import axios from "axios";

// Simulamos una API que retorna una respuesta para la solicitud de crédito
export const requestLoan = async (formData) => {
  try {
    // Simulamos la llamada API con un setTimeout
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          status: 200,
          data: {
            ...formData,
            status: "Aprobada",
            loanId: "12345",
            approvalDate: new Date().toISOString(),
          },
        });
      }, 2000) // 2 segundos para simular una espera
    );

    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de crédito:", error);
    return { status: "Error", message: "Hubo un error procesando tu solicitud." };
  }
};
