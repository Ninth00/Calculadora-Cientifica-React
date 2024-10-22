import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Función para manejar las entradas
  const handleInput = (value) => {
    if (value === '.' && input.slice(-1) === '.') return;
    setInput((prev) => prev + value);
  };

  // Función para calcular y validar
  const calculate = () => {
    try {
      console.log("Input actual: ", input);

      // Validar división por cero
      if (input.includes('/0')) {
        alert('Error, División por cero no permitida');
        return;
      }

      // Validar paréntesis
      const openParentheses = (input.match(/\(/g) || []).length;
      const closeParentheses = (input.match(/\)/g) || []).length;

      let expression = input;
      if (openParentheses > closeParentheses) {
        expression += ')'.repeat(openParentheses - closeParentheses);
      }

      console.log("Expresión corregida: ", expression);

      // Reemplazar funciones y convertir grados a radianes
      expression = expression
        .replace(/\^/g, '**')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/sin\((\d+(\.\d+)?)\)/g, (match, p1) => `Math.sin(${p1} * (Math.PI / 180))`)
        .replace(/cos\((\d+(\.\d+)?)\)/g, (match, p1) => `Math.cos(${p1} * (Math.PI / 180))`)
        .replace(/tan\((\d+(\.\d+)?)\)/g, (match, p1) => `Math.tan(${p1} * (Math.PI / 180))`);

      console.log("Expresión antes de evaluar: ", expression);

      // Validar expresiones inválidas
      if (expression.match(/Math\.sqrt\(-\d+\)/) || expression.match(/Math\.log10\(-\d+\)/)) {
        alert('Error, Raíz cuadrada o logaritmo de número negativo no permitidos');
        return;
      }

      const evaluatedResult = eval(expression); // Evaluar la expresión
      console.log("Resultado evaluado: ", evaluatedResult);
      setResult(evaluatedResult.toString());

    } catch (error) {
      console.error('Error de cálculo: ', error);
      alert('Error, Operación inválida');
    }
  };

  // Función para limpiar la entrada
  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.result}>{result || '0'}</Text>
      <Text style={styles.input}>{input || '0'}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={clearInput} style={styles.button}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('^')} style={styles.button}>
          <Text style={styles.buttonText}>^</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('sqrt(')} style={styles.button}>
          <Text style={styles.buttonText}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('log(')} style={styles.button}>
          <Text style={styles.buttonText}>log</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('sin(')} style={styles.button}>
          <Text style={styles.buttonText}>sin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('cos(')} style={styles.button}>
          <Text style={styles.buttonText}>cos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('tan(')} style={styles.button}>
          <Text style={styles.buttonText}>tan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('/')} style={styles.button}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('7')} style={styles.button}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('8')} style={styles.button}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('9')} style={styles.button}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('*')} style={styles.button}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('4')} style={styles.button}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('5')} style={styles.button}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('6')} style={styles.button}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('-')} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('1')} style={styles.button}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('2')} style={styles.button}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('3')} style={styles.button}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('+')} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleInput('0')} style={styles.button}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleInput('.')} style={styles.button}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={calculate} style={styles.button}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    color: 'white',
    fontSize: 30,
    textAlign: 'right',
    marginBottom: 20,
  },
  result: {
    color: '#4CAF50',
    fontSize: 40,
    textAlign: 'right',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
