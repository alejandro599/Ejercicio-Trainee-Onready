
class Vehiculos {
  
    constructor() {
      this.vehiculos = new Array();  
    }
  
    cargar() {
      this.vehiculos.push({'marca': 'peugeot', 'modelo': 206, 'puertas': 4, 'precio': 200000});
      this.vehiculos.push({'marca': 'honda', 'modelo': 'titan', 'cilindrada': '125cc', 'precio': 60000});
      this.vehiculos.push({'marca': 'peugeot', 'modelo': 208, 'puertas': 5, 'precio': 250000});
      this.vehiculos.push({'marca': 'yamaha', 'modelo': 'YBR', 'cilindrada': '160cc', 'precio': 80500.5});
    }
  /**Devuelve marca y modelo según precio más caro o barato, según strin recibido*/
    buscarPorPrecio(orden) {
    
      let vehiculo;                       
  
      if(typeof orden === "string") {
        orden = orden.trim().toLowerCase(); // Quitando espacios y pasando a minúsculas para evitar problemas.
  
        if(orden === "caro") {   
          for(let v of this.vehiculos)
            if(vehiculo === undefined || v.precio > vehiculo.precio)
              vehiculo = v;           
        }
        else if(orden === "barato") {
          for(let v of this.vehiculos)
            if(vehiculo === undefined || v.precio < vehiculo.precio)
              vehiculo = v;           
        }   
        else
          throw new Error("No se ha recibido una orden válida en método 'buscarPorPrecio'.");
          
        // Mostrando resultado.
        console.log(`Vehículo más ${orden}: ${this.capitalizar(vehiculo?.marca)} ${this.capitalizar(vehiculo?.modelo)}`);
      }
      else
        throw new TypeError("No se ha recibido un string en método 'buscarPorPrecio'.");
    }

    /************************Mostrando los Vehículos con algunas especificaciones según string recibido */
    mostrar(campos) {
        
        let datos = "";           
        
        if(campos === undefined) {  // Si no se recibe campos en particular como argumento, obtener todos.
          for(let v of this.vehiculos) {
            for(let p in v)
              if(p !== "precio")    // En tanto no sea 'precio', agregar // al final;
                datos += `${this.capitalizar(p)}: ${this.capitalizar(v[p])} // `;
              else                  // Si es 'precio', agregar '$' antes del precio y hacer salto de linea.
                datos += `${this.capitalizar(p)}: \$${this.formatear(v[p])}\n`;
          }
        } 
        // En caso de recibirse un array, agregar del vehículo solo los campos pasados de ese array.
        else if(typeof campos === "object") {
          for(let v of this.vehiculos) {
            for(let campo of campos) {
              if(v.hasOwnProperty(campo)) {
                datos += `${this.capitalizar(v[campo])} `;
              }
            }
            datos += '\n';  // Agregar salto de linea después de recorrer todos los campos de un vehículo.
          }      
        }  
        else
          throw new Error("Variable 'campos' no es del tipo array/objeto en el método 'mostrar'.");
        
        console.log(datos);
      }  
/** Recibe number o string, parsea a string y luego Capitaliza */
      capitalizar(cadena) {
        if(typeof cadena === "number")    // Si es número.
          cadena = String(cadena);//Parsear a string.
        
        if(typeof cadena === "string") {  // Ver si es string
          cadena = cadena.trim();
          return cadena[0].toUpperCase() + cadena.substring(1);//Capitalizar.
        }
        else
          throw new TypeError("No se ha recibido un string o número a parsear en método 'capitalizar'.");
      }
    
      /**********Formatea el nro ingresaro con separadores de miles y decimales. */ 
      formatear(precio) {
          
        if(typeof precio === "number") {
          return precio.toLocaleString("es",  {style: 'decimal', minimumFractionDigits: 2});//Formatea por miles y decimales.
        }
        else
          throw new TypeError("No se ha recibido un número (entero o float) en método 'formatear'.");
      }
      /** Busca en vehiculos sobre el campo modelo una letra recibica y devuelve el modelo que concuerde */
    buscarLetraEnModelo(letra) {
    
      let vehiculo;                                 // Variable donde se guardará el objeto vehículo buscado.
  
      if(typeof letra === "string") {
        letra = String(letra).trim().toLowerCase(); // Parseando por si es n° (y se quita espacios y se pasa a minúsculas).
  
        if(letra.length != 1)
          throw new Error("Se ha recibido más de una letra como argumento en método 'buscarLetraEnModelo'.");
  
        for(let v of this.vehiculos) {
          let modelo = String(v.modelo).toLowerCase();  // El modelo puede ser un n° o estar en mayúsculas.
          if(modelo.includes(letra))                    // Buscando letra en modelo.
            vehiculo = v;
        }
  
        // Mostrando resultado.
        console.log(`Vehículo que contiene en el modelo la letra ‘${letra.toUpperCase()}‘: ${this.capitalizar(vehiculo?.marca)} ${this.capitalizar(vehiculo?.modelo)} \$${this.formatear(vehiculo?.precio)}`);
      }
      else
        throw new TypeError("No se ha recibido como argumento un string en método 'buscarLetraEnModelo'.");
    }
  
    
  
    
  /*********************Ordenando por precio  ************************/
    ordenarPorPrecio(orden="mayor") {
      
      
      if(typeof orden === "string") {
        orden = orden.trim().toLowerCase(); // Quitando espacios y pasando a minúsculas.
  
        if(orden === "mayor")
          this.vehiculos.sort((a, b) => b.precio-a.precio);
  
        else if(orden === "menor")
          this.vehiculos.sort((a,b) => a.precio-b.precio);       
          
        else
          throw new Error("No se ha recibido una orden válida en método 'ordenarPorPrecio'.");          
      }    
      else
        throw new TypeError("No se ha recibido un string en método 'ordenarPorPrecio'.");
    }
  }
  
  function iniciandoEjercicio() {
    /* Función utilizada para crear la clase 'Vehículos' y resolver los ejercicios
    por medios de llamadas a métodos a la instancia. */
    try {
      let v = new Vehiculos();
      //Mostrando Vehículos.
      v.cargar();
      v.mostrar();
      
     //Vehículo más caro, más barato y el que contiene la letra especificada.
      console.log("=============================");
      v.buscarPorPrecio(orden="caro");
      v.buscarPorPrecio(orden="barato");
      v.buscarLetraEnModelo(letra="Y")
  
      console.log("=============================");
      //Vehículos ordenados por precio de mayor a menor:
      v.ordenarPorPrecio(orden="mayor");
      v.mostrar(["marca", "modelo"]);
    }
    catch(e) {
      console.log(`\n# Se produjo: ${e.name}.`);
      console.log(`  - Mensaje: "${e.message}".\n`);
    }
  }
  
  iniciandoEjercicio();