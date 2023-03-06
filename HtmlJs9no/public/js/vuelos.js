var url = "http://localhost:3000/api/v1/vuelos";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (vuelos) => {

        $.each(vuelos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.vuelo + "</td>" + "<td>" + val.email + "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpovuelos').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'Vuelos',
        text: "Esta seguro de eliminar al vuelo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + '/' + id,
                type: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                success:(mensaje)=>{
                   cargatabla();
                   limpiaCajas();
                    Swal.fire('vuelos',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var vuelo = document.getElementById('vuelo').value;
    var email = $('#email').val();
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar vuelo
        var tipoEnvio = "PUT";
        var vueloDTO = {
            _id: id,
            nombre: nombre,
            email: email
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo vuelo
        var tipoEnvio = "POST";
        var vueloDTO = {
            nombre: nombre,
            email: email
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(vueloDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (Ivuelo) => {
            if (Ivuelo) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(Ivuelo);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unvuelo) => {

        if (unvuelo) {
            $('#_id').val(id);
            $('#nombre').val(unvuelo.nombre);
            document.getElementById('vuelo').value = unvuelo.vuelo;
            $('#idModal').html('Editar vuelo')
            $('#Modalvuelos').modal('show');
        } else {
            alert('error, no se encuentra al vuelo');
            console.log(unvuelo);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('vuelo').value = '';
    $('#email').val('');
    $('#Modalvuelos').modal('hide');
}
