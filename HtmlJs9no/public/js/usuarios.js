var url = "http://localhost:3000/api/v1/usuarios";

$().ready(() => {
    cargatabla();
});
var cargatabla = () => {
    var html = "";
    $.get(url, (usuarios) => {

        $.each(usuarios, (usuarios, val) => {
            html += "<tr>" + "<td>" + (
                usuarios + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.usuario + "</td>" + "<td>" + val.email + "</td>" + "<td>" + "<button class='btn btn-success' onclick=uno('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger' onclick=eliminar('" + val._id + "')>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpoUsuarios').html(html);
    });
}

var eliminar = (id) => {
    Swal.fire({
        title: 'Usuarios',
        text: "Esta seguro de eliminar al usuario!",
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
                    Swal.fire('Usuarios',  mensaje.msg, 'success')
                }

            });
            
        }
    })
}
var guardaryEditar = () => {
    var nombre = document.getElementById('nombre').value;
    var usuario = document.getElementById('usuario').value;
    var email = $('#email').val();
    var password = $('#password').val();
    var id = document.getElementById('_id').value;
    if (id != '') { // TODO:Editar Usuario
        var tipoEnvio = "PUT";
        var UsuarioDTO = {
            _id: id,
            nombre: nombre,
            usuario: usuario,
            email: email,
            password: password
        }
        url = url + "/" + id;
    } else { // TODO:Nuevo usuario
        var tipoEnvio = "POST";
        var UsuarioDTO = {
            nombre: nombre,
            usuario: usuario,
            email: email,
            password: password
        }
    }
    $.ajax({
        url: url,
        type: tipoEnvio,
        data: JSON.stringify(UsuarioDTO),
        processData: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IUsuario) => {
            if (IUsuario) {
                alert('Se guardo con exito');
                cargatabla();
                limpiaCajas();
            } else {
                console.log(IUsuario);
                alert('error al guardar');
                limpiaCajas();
            }
        }
    });
}

var uno = (id) => {
    $.get(url + "/" + id, (unUsuario) => {

        if (unUsuario) {
            $('#_id').val(id);
            $('#nombre').val(unUsuario.nombre);
            document.getElementById('usuario').value = unUsuario.usuario;
            $('#email').val(unUsuario.email);
            $('#password').val(unUsuario.password);
            $('#idModal').html('Editar Usuario')
            $('#ModalUsuarios').modal('show');
        } else {
            alert('error, no se encuentra al usuario');
            console.log(unUsuario);
        }
    })
}


var limpiaCajas = () => {
    $('#_id').val('');
    $('#nombre').val('');
    document.getElementById('usuario').value = '';
    $('#email').val('');
    $('#password').val('');
    $('#ModalUsuarios').modal('hide');
}
