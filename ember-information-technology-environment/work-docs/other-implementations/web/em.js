//resources
resources.add("system.browserConsole","oneshot","string",null,null)
resources.add("system.browserDrawable","oneshot","raster",null,null)
resources.add("system.KeyEvents",null,null,"stream","string")
resources.add("system.browserPointerEvents",null,null,"stream","rasterCoordinateEvents")
resources.add("system.browserJavaScriptAlerts","string",null)
resources.defaultStringOut="system.browserConsole"
resources.defaultRasterOut="system.browserWindow"
resources.defaultStringIn="system.KeyEvents"

function em_execute(file) {
    //do stuff
}
