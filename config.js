/* ============================================================================
 *  CONFIG.JS — Configuración central del Aplicativo de Gestión de Riesgos
 *  Todos los IDs de QuintaDB y el mapa de campos viven aquí.
 *  Si mañana cambian las tablas, este es el único archivo a tocar.
 * ============================================================================ */

const CONFIG = {

  // URL del Web App de Apps Script (termina en /exec). PÉGALA AQUÍ tras desplegar.
  PROXY_URL: "https://script.google.com/macros/s/AKfycbxPGoHY5fyaBSyZRShw_8i4ax7AV37tFb_Engcb9Gcy14NILgFZ5mi6il5Kn9ksFnbO/exec",

  // Token opcional (debe coincidir con PROXY_TOKEN del Codigo.gs). Vacío = no se usa.
  PROXY_TOKEN: "",

  // Identificador de la base de datos en QuintaDB
  APP_ID: "bxW5nYl8nlkOokW4JcMfb2",

  // ---- Tablas (entities) -------------------------------------------------
  ENTITIES: {
    MATRIZ:       "cKsCkOEcvgW59zuCkyFCkN", // Matriz de Riesgos y Oportunidades
    INVENTARIO:   "dcUCouymnkz4ovWRVdOmk0", // Inventario de procesos y procedimientos
    REPORTES:     "czW791qCnmdj49WPxdRmoH", // Subtabla "Reporte de acciones"
    // Tablas maestras (origen de los desplegables de relación)
    AMENAZAS:     "ddLmklpYHlqOGGWRauyf8c",
    OPORTUNIDADES:"cCn3pdNt9odOogW4euW5Xw",
    PARTES:       "dcLdFdTmjog4k3mfBcPGKk",
    TIPO_PROCESO: "axh8kJp11dJ4LFWOmle8o2",
    NIVEL0:       "czzdJdKmjnWPSYbSk7v8ot",
    NIVEL1:       "bjW7pcICjogOowWR_cISkf",
    NIVEL2:       "csA8ocWP1eW5aaW6lcUCkM",
    NIVEL3:       "dcRNhdP8ngEixcV8kmWP5v",
    RESPONSABLES: "cXW7_dOCnctOlcRSo6W4LK"
  },

  // ---- Campos de la MATRIZ (field_id por nombre lógico) ------------------
  // Solo se ESCRIBEN los editables. Los "formula"/"linked_column" son de solo
  // lectura: QuintaDB los calcula. Marcados con readOnly:true.
  MATRIZ_FIELDS: {
    fecha_evaluacion:        { id: "dcG8kUFmjnWOtcLSoQeCkY", type: "date"   },
    fuente:                  { id: "dcPa5XiCjhn7lcVxfyvCkl", type: "select", options: ["Contexto","Partes interesadas","Proceso"] },
    amenaza:                 { id: "bInCoidmjodkpdR1aVxCk0", type: "rel", entity: "AMENAZAS" },
    oportunidad_rel:         { id: "c2xSoemJbcMiVcKmk5mCk6", type: "rel", entity: "OPORTUNIDADES" },
    parte_interesada:        { id: "aeWOlcJ8nfWRBdR8objwri", type: "rel", entity: "PARTES" },
    requisitos:              { id: "ddKeRdNSnhh7r-WOJdS2T-", type: "linked_column", readOnly: true },
    expectativas:            { id: "ddLMRcNNTkW7_cR8oPDbOi", type: "linked_column", readOnly: true },
    tipo_proceso:            { id: "dcOSkYeCnbW6JcL8onFYvR", type: "rel", entity: "TIPO_PROCESO" },
    proceso_n0:              { id: "dcUhCDWPjdWP4hW63cKM8-", type: "rel", entity: "NIVEL0" },
    proceso_n1:              { id: "aqW5Lqnmjge6eqW7RdSSoT", type: "rel", entity: "NIVEL1" },
    proceso_n2:              { id: "dcSxxcMYrkDkldVSkavga8", type: "rel", entity: "NIVEL2" },
    riesgo_u_oportunidad:    { id: "ajW5fNsv5cSOkUcb_dRZOw", type: "select", options: ["Riesgo","Oportunidad"] },
    actividad:               { id: "bHWPVcM1HdRikFWPpcHSom", type: "string" },
    riesgo_desc:             { id: "aEW7vppbrdS4oXv0VcLSoh", type: "text" },
    oportunidad_desc:        { id: "c6W5CsWQ5kFykQWRWxaSoV", type: "text" },
    causas:                  { id: "dcHXqRWOrcK4kbW4NcUHKS", type: "text" },
    consecuencias:           { id: "cOWOTHWObcMyzZrmotrJ9W", type: "text" },

    // --- Evaluación INHERENTE (editable: prob + impacto; calculados: el resto) ---
    prob_riesgo_inh:         { id: "ddMaakW61lWQibWQxdLSoO", type: "select", options: ["1: Muy raro","2: Ocasionalmente","3: Frecuente","4: Muy frecuente"] },
    imp_riesgo_inh:          { id: "ddGeKVhgbdzBhdK8kyjcSi", type: "select", options: ["1: Muy bajo","2: Bajo","3: Moderado","4: Alto"] },
    prob_oport_inh:          { id: "bKtfX6WQnmkOkMWPClcmkr", type: "select", options: ["1: Muy raro","2: Ocasionalmente","3: Frecuente","4: Muy frecuente"] },
    imp_oport_inh:           { id: "dcLCkyWObdIiobWQFcRmoC", type: "select", options: ["1: Bajo","2: Moderado","3: Alto"] },
    indice_riesgo_inh:       { id: "ddPv4KWRDcSBO9ifddNtjS", type: "formula", readOnly: true },
    nivel_riesgo_inh:        { id: "ddVvpcNmjdpBjyWQtdKwD5", type: "formula", readOnly: true },

    // --- Controles y tratamiento ---
    existen_controles:       { id: "ddNbdcGSjhbjxdIeNdJSks", type: "select", options: ["Sí","No"] },
    control_establecido:     { id: "ccW4uznCjaqPS0WRtdMmkW", type: "text" },
    respuesta:               { id: "ddLSo_W6HdWPxdRmkCw8oj", type: "select", options: ["Eliminar","Mitigar","Trasladar","Asumir"] },
    responsable:             { id: "aSWQddTmnmrOkXAmkbWR0Y", type: "rel", entity: "RESPONSABLES" },
    medida_respuesta:        { id: "caWPnqWPrhW5FcRvSPW70I", type: "text" },

    // --- Seguimiento / habilitación del residual ---
    reporte_acciones:        { id: "bfyfuPWQ9gWPv5nfNdHmoh", type: "subform", entity: "REPORTES" },
    certificacion_control:   { id: "ddN8kJW5vdKjWNcY4BpmoP", type: "select", options: ["No Implementado","Implementado sin validar","Certificado/Operativo"] },
    estado_reevaluacion:     { id: "ddSXZcNmnbWQhdMCkoW7Pd", type: "select", options: ["Sí procede","No procede"] },
    fecha_reevaluacion:      { id: "dcU8oTm8ngW6lcK8kDW4rr", type: "date" },

    // --- Evaluación RESIDUAL (editable solo si "procede") ---
    prob_riesgo_res:         { id: "c_WQRdVLbcLioxBxtcK8kH", type: "select", options: ["1: Muy raro","2: Ocasionalmente","3: Frecuente","4: Muy frecuente"] },
    imp_riesgo_res:          { id: "aXeSoBWRvcHOkwhw3dLfK9", type: "select", options: ["1: Muy bajo","2: Bajo","3: Moderado","4: Alto"] },
    indice_riesgo_res:       { id: "bEW5rLwrnehyo4x8kEWQT5", type: "formula", readOnly: true },
    nivel_riesgo_res:        { id: "c4WPpcNSncW5LrW40KtSk5", type: "formula", readOnly: true },

    // --- CAMPOS DE TEXTO (reemplazan a las relaciones para poder guardar/editar
    //     desde el aplicativo). Guardan el NOMBRE, no el ID. ---
    proceso_txt:             { id: "dcJchdUCjkfOkhW6VcUCoS", type: "string", col: "Proceso" },
    responsable_txt:         { id: "ayFSodvNDcMOorwCocW7jx", type: "string", col: "Responsable - string" },
    amenaza_txt:             { id: "cMWRZdJLjcPzT8WQpdNmox", type: "string", col: "Amenaza - string" },
    oportunidad_txt:         { id: "cgBSoSWODdRPRcJdazW7eO", type: "string", col: "Oportunidad - text" },
    parte_txt:               { id: "cpWRGkWRfhAi8sW45VjHzi", type: "string", col: "Parte interesada " }
  },

  // ---- Campos de la SUBTABLA Reporte de acciones (IDs reales verificados) ----
  REPORTE_FIELDS: {
    fecha_reporte:  { id: "ddSIRdSSnoiikenSogsuLu", type: "date", col: "Fecha de reporte" },
    accion:         { id: "crsCo9n8jbf500emo4g8kA", type: "text", col: "Acción desarrollada" },
    pct_completado: { id: "cQW4tdRKLdVioZWOJdQCoW", type: "integer", col: "% completado" },
    evidencia2:     { id: "aIWRX9W7TmW5TbwmoXcszL", type: "url",  col: "Evidencia 2" },
    observacion:    { id: "aQWOHyWRvcSiotbeSqWOen", type: "text", col: "Observación" },
    estado:         { id: "ddGIWLW6PcGikeWO88W6mU", type: "select", col: "Estado medida(s) de respuesta", options: ["Pendiente","En Proceso","Culminado/Ejecutado"] }
  },

  // ---- Campos del INVENTARIO (para la cascada) ---------------------------
  INVENTARIO_FIELDS: {
    tipo_proceso: { id: "bTW5RdU8jfvRChwwFdPSkI", type: "rel", entity: "TIPO_PROCESO" },
    proceso_n0:   { id: "dcUWH1c1zhW5bGiCkMjrK8", type: "rel", entity: "NIVEL0" },
    proceso_n1:   { id: "cSWR_cI8jbqPpcGSkJd8oL", type: "rel", entity: "NIVEL1" },
    proceso_n2:   { id: "ccWP_cOmnkj4oNbcOzaZq4", type: "rel", entity: "NIVEL2" },
    proceso_n3:   { id: "cDW5SHlCnmW7bkgaaMW6fP", type: "rel", entity: "NIVEL3" },
    procedimiento:{ id: "coi8oUW41cMOk7cCk2W4vk", type: "text" },
    codigo_proc:  { id: "dcVSkHkSnhl5iaW7uMqCox", type: "select" }
  },

  // ---- Reglas de negocio -------------------------------------------------
  REGLAS: {
    // Qué campos de origen activa cada Fuente
    fuenteActiva: {
      "Contexto":          ["amenaza", "oportunidad_rel"],
      "Partes interesadas":["parte_interesada"],
      "Proceso":           ["tipo_proceso","proceso_n0","proceso_n1","proceso_n2"]
    },
    // Condiciones para habilitar la evaluación RESIDUAL (deben cumplirse AMBAS)
    residual: {
      certificacionRequerida: "Certificado/Operativo",
      estadoAccionRequerido:  "Culminado/Ejecutado",
      modoAcciones: "OR" // basta con que ≥1 reporte cumpla
    },
    // Mapa de Índice (P×I) → Nivel de riesgo (referencia para el dashboard)
    nivelesRiesgo: [
      { max: 4,  nivel: "Nivel 1: Riesgo bajo" },
      { max: 9,  nivel: "Nivel 2: Riesgo medio" },
      { max: 12, nivel: "Nivel 3: Riesgo alto" },
      { max: 16, nivel: "Nivel 4: Riesgo intolerable" }
    ]
  }
};

// Exportar para uso en el frontend
if (typeof module !== "undefined") { module.exports = CONFIG; }
