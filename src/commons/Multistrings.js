import LocalizedStrings from "react-native-localization";

export default new LocalizedStrings({
  es: {
    validationCompany: 'Empresa no válida',
    validationMail: 'Introduce un email correcto',
    validationPassword: 'La contraseña debe tener al menos 8 caracteres',
    validationToken: 'El token debe tener al menos 8 caracteres',
    validationFields: 'Rellena todos los campos',

    errorCompanyExist: 'Error comprobando la compañía',
    errorCompanyNoExist: 'No se ha encontrado la compañía',
    errorAppUpdate: 'Para continuar debe actualizar la aplicación',
    errorCredentials: 'Email y/o contraseña incorrectos',
    errorLogin: 'Error en el inicio de sesión',
    errorRefreshToken: 'Error al comprobar el token',

    errorFetchConversationList: 'Error obteniendo las conversaciones',
    errorPostQuestionResponse: 'Error enviando su respuesta',
    errorFetchingNextQuestion: 'Error obteniendo la siguiente pregunta',

    tutorialTitle: 'Todas tus conversaciones',
    tutorialSubtitle: 'Escucha y habla.\nAprende y resuelve.',
    accessToCompany: 'Accede a tu empresa',
    send: 'Enviar',
    loginInto: 'Inicia sesión en',
    company: 'Empresa',
    tipCompany: 'Escribe el nombre de dominio de la empresa',
    mail: 'Mail',
    password: 'Contraseña',
    access: 'Entrar',
    rememberPassword: 'Recordar contraseña',
    terms1: 'Al presionar "entrar" ',
    terms2: 'acepto las condiciones de uso',
    terms3: ' y la ',
    terms4: 'política de privacidad.',
    login: 'Login',

    chat: 'Chat',
    conversations: 'Conversaciones',
    files: 'Archivo',
    settings: 'Ajustes',
    confirmLogOut: '¿Quieres cerrar sesión?',

    accept: 'Aceptar',
    cancel: 'Cancelar',
    edit: 'Editar',
    logOut: 'Salir',
    yesterday: 'Ayer',
    image: 'Imagen',
  },
});
