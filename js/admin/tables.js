LWDK.TableConfig = {
    responsive: true,
    initComplete: () => setTimeout(() => {
        LWDK.stopLoading();
        $(".row.loading").slideUp();
        $(".row:not(.loading)").animate({opacity: 1});
    }, LWDK.sleepTime),
    pageLength: 15,
    dom: 'Bfrtip',
    language: {
        url: '/i18n/datatables/pt-BR.json'
    }
};

LWDK.TableLoad = function(){
    jQuery('table').each(function(){
        let exportLength = $(this).find("th").length - 2;
        const tbl = this;

        tbl.actions_table = new (function () {
            function create_actions_buttons(a, b = null, d = null) {
                LWDK.el("#actions")[0].prepend((d = a));

                b = [
                    ["<span><i class='la la-trash'></i></span>&nbsp;Apagar Selecionados", "btn-danger", function(){
                        Swal.fire({
                            title: ``,
                            html: `<h4>Deseja mesmo apagar em massa?</h4><br><h6><span  style=\'color: #A00\'>Essa a&ccedil;&atilde;o &eacute; irrevers&iacute;vel!</span></h6>`,
                            icon: `question`,
                            showCancelButton: true,
                            confirmButtonColor: `#3085d6`,
                            cancelButtonColor: `#d33`,
                            confirmButtonText: `Sim, apagar`,
                            cancelButtonText: `Cancelar`,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                successRequest(null, `Pronto! Todos os dados selecionados foram apagados.`);
                                let rows = GetFormData();
                                if(isArray(rows.deleteGroup)){
                                    for(let i = 0; i < rows.deleteGroup.length; i++){
                                        if(rows.deleteGroup[i]){
                                            document.querySelector("a[data-id=\"" + rows.idTrash[i] + "\"]").deleteThis();
                                        }
                                    }
                                } else if(isBoolean(rows.deleteGroup)) {
                                    if(rows.deleteGroup){
                                        document.querySelector("a[data-id=\"" + rows.idTrash + "\"]").deleteThis();
                                    }
                                }
                                for(i of LWDK.el(`input[type=checkbox]`)){i.checked = false}
                            }
                        });
                    }],
                ];
                for (let c of b) {
                    d.append((a = document.createElement("button")));
                    a.innerHTML = c[0];
                    a.setAttribute("style", "color: #fff; display: inline-block;");
                    a.classList.add("btn");
                    a.classList.add("m-btn");
                    a.classList.add(c[1]);
                    a.classList.add("mr-1");
                    a.addEventListener("click", c[2]);
                }
                d.append((a = document.createElement("span")));
                a.classList.add("mr-2");
                a.classList.add("ml-2");
                a.style.borderRight = "1px solid #777";
            }
            this.element = document.createElement("button-group");
            this.visible = false;
            let first_visible = true;
            const Action = (instance) => (instance.visible ? (first_visible ? (create_actions_buttons(instance.element), (first_visible = false)) : instance.element.classList.remove("d-none")) : instance.element.classList.add("d-none"));
            const Self = this;
            this.off = () => (Self.visible = false);
            this.state = () => Self.visible;
            this.on = () => (Self.visible = true);
            this.toggle = () => (Self.visible = !Self.visible);
            LWDK.step(() => Action(Self), 0);
        })();

        LWDK.step(function(){
            if(typeof GetFormData().deleteGroup == typeof void 0)return;
            let any = false;
            if(isArray(GetFormData().deleteGroup)){
                for(i of GetFormData().deleteGroup){
                    any = any || i;
                }
            } else if(isBoolean(GetFormData().deleteGroup)) {
                any = any || GetFormData().deleteGroup;
            }
            tbl.actions_table[any?"on":"off"]();
        });

        tbl.deletableUpdate = () => $(tbl).find(".delete-item-table").each(function(){
            const btn = this;
            btn.deleteThis = function(){
                let url, post = {};
                if(btn.classList.contains("vhsys")){
                    url = `/vhsys/${$(btn).data("keyword")}/delete/`;
                    post.id = $(btn).data("id");
                } else {
                    url = `/admin/${$(btn).data("keyword")}/${$(btn).data("id")}/apagar/`;
                }
                LWDK.request(url, post, function(){
                    const parent = $(btn).closest("tr");
                    let childrens = parent.children('td');

                    childrens.animate({
                        backgroundColor: "rgb(224, 81, 81)",
                        color: "#fff"
                    }, LWDK.sleepTime / 4);

                    setTimeout(() => $(childrens)
                        .animate({ paddingTop: 0, paddingBottom: 0 }, 500)
                        .wrapInner('<div />')
                        .children()
                        .slideUp(LWDK.sleepTime / 3)
                        .promise()
                        .done(() => {
                            parent.closest("table")[0].DataTable.row(parent).remove().draw();
                            setTimeout(() => tbl.deletableUpdate(), LWDK.sleepTime);
                        }),
                        LWDK.sleepTime * .85
                    );
                });
            };
            $(btn).removeClass("delete-item-table").click(function(){
                Swal.fire({
                    title: ``,
                    html: `<h4>Deletar ${$(this).data("category")}?</h4><br><h6><span  style=\'color: #A00\'>Essa a&ccedil;&atilde;o &eacute; irrevers&iacute;vel!</span></h6>`,
                    icon: `warning`,
                    showCancelButton: true,
                    confirmButtonColor: `#3085d6`,
                    cancelButtonColor: `#d33`,
                    confirmButtonText: `Sim, apagar`,
                    cancelButtonText: `Cancelar`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        successRequest(null, `${$(btn).data("category")} apagado(a) com sucesso!`);
                        setTimeout(() => btn.deleteThis(), LWDK.sleepTime);
                    }
                });
            });
        });

        function btn(extension, extended = {}){
            let ret = [];
            for(i = 0; i < exportLength; i++){
                ret.push(i);
            }
            extended.extend = extension;
            extended.exportOptions = {
                columns: ret
            };
            return extended;
        }

        function setTable(){
            let _ = c => typeof c === typeof void 0;
            if(_($) || _($.fn) || _($.fn.dataTable) || _($.fn.dataTable.moment)){
                return setTimeout(setTable, 1e3);
            }

            setTimeout(function(){
                function applyIcon($jq, icn, cl){
                    $jq = $($jq);
                    $jq.html(`<i class="la la-${icn}" style="color: ${cl}"></i><div class="d-md-inline-block d-none">&nbsp;${$jq.html()}</div>`);
                }
                function hideOnMobile($jq, icn, cl){
                    return $($jq).addClass("d-none d-lg-inline-block");
                }
                applyIcon('.buttons-excel', "file-excel", "rgb(12, 148, 0)");
                applyIcon('.buttons-pdf', "file-pdf", "rgb(163, 2, 2)");
                applyIcon('.buttons-print', "print", "rgb(6, 74, 227)"); hideOnMobile('.buttons-print');
                applyIcon('.buttons-copy', "copy", "rgb(91, 103, 138)");
                applyIcon('.buttons-csv', "file", "rgb(56, 163, 118)"); hideOnMobile('.buttons-csv');
            }, LWDK.sleepTime);

            tbl.deletableUpdate();

            $.fn.dataTable.moment( 'DD/MM/YYYY' );

            LWDK.step(() => {
                if(LWDK.TableConfig.ajax && $("tbody tr td").length == 1){
                    console.log("attempt");
                    try {
                        $("table").length && $("table")[0].DataTable && $("table")[0].DataTable.ajax && !$("table")[0].DataTable.ajax.json() && location.reload();
                    } catch(err) {
                        location.reload();
                    }
                }
            });

            if(LWDK.TableConfig.ajax){
                jQuery('table').on( 'draw.dt', function () {
                    jQuery('table')[0].deletableUpdate();

                    jQuery("td, th").addClass("position-relative").css("height", "26px");

                    jQuery("th").last().html('<div class="d-flex position-absolute top-0 left-0 right-0 bottom-0 w-100 h-100 justify-content-center align-items-center bg-gray" data-tooltip="Selecionar Todos" data-inverted><label class="p-0 m-0 w-34 h-44 m-checkbox m-checkbox--dark"><input type="checkbox" onclick="for(i of LWDK.el(`input[type=checkbox]`)){i.checked = this.checked;}" /><span></span></label></div>');
                });
            }
            tbl.DataTable = $(tbl).DataTable(LWDK.TableConfig);
        }

        LWDK.TableConfig.buttons = [
            btn('copy'),
            btn('excel'),
            btn('csv'),
            btn('pdf', {
                orientation:'portrait',
                pageSize: 'A4', //formato stampa
                alignment: "center",
                customize : function(doc){
                    doc.content[1].margin = [ 0, 0, 0, 0 ];
                    doc.content[1].table.widths =Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    doc.defaultStyle.alignment = 'center';
                    doc.styles.tableHeader.alignment = 'center';
                }
            }),
            btn('print')
        ]

        LWDK.TableConfig.columnDefs = new Array;
        $("th").each(function(){
            let def = $(this).data();
            def.width = `${def.width}%`;
            def.targets =  LWDK.TableConfig.columnDefs.length;
            LWDK.TableConfig.columnDefs.push(def);
        });

        setTable();
    });
};
