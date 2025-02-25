function getMonthName(mo) {
    mo = mo - 1; // Ajusta o número do mês para o índice do array (1 = Jan, 12 = Dec)
    var months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    if (months[mo] !== undefined) {
      return months[mo];
    } else {
      throw new Error("InvalidMonthNo"); // Lança um erro adequado
    }
  }
  
  try {
    let myMonth = 5; // Definindo o mês para teste
    let monthName = getMonthName(myMonth); // Chama a função corretamente
    console.log("Mês:", monthName);
  } catch (e) {
    let monthName = "unknown"; // Define um valor padrão em caso de erro
    console.error("Erro:", e.message);
    // logMyErrors(e); // Se houver uma função de log, descomente esta linha
  }
  