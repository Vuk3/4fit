#pragma checksum "C:\Users\Vuk\Desktop\Moji projekti\4fit\Aplikacija\Pages\admin.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "15b9fdb1294c755330ec77997e9e8f97f3b84e99"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_admin), @"mvc.1.0.razor-page", @"/Pages/admin.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 2 "C:\Users\Vuk\Desktop\Moji projekti\4fit\Aplikacija\Pages\admin.cshtml"
using _4fit.Pages;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"15b9fdb1294c755330ec77997e9e8f97f3b84e99", @"/Pages/admin.cshtml")]
    #nullable restore
    public class Pages_admin : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 4 "C:\Users\Vuk\Desktop\Moji projekti\4fit\Aplikacija\Pages\admin.cshtml"
     
    Layout = "_Layout";
    ViewData["Title"] = "4fit";

#line default
#line hidden
#nullable disable
            WriteLiteral("\n\n");
            DefineSection("OpcijeHeder", async() => {
                WriteLiteral(@"

<div class=""collapse navbar-collapse udalji"" id=""navbarResponsive"">
    <ul class=""navbar-nav marginaLevo"">
        <li class=""nav-item active crtajPocetnuAdmin pointer""><a class=""nav-link selected aPocetna"">Pocetna strana</a></li>
        <li class=""nav-item crtajForum pointer""><a class=""nav-link aForum"">Forum</a></li>
        <li class=""nav-item crtajKorisnikeAdmin pointer""><a class=""nav-link aKorisnici"">Korisnici</a></li>
        <li class=""nav-item crtajZahteveAdmin pointer""><a class=""nav-link aZahtevi"">Zahtevi</a></li>
        

    </ul>

    <ul class=""nav navbar-nav navbar-right"">
    <form action=""/Auth/LogOut"" method=""post"">
        <li class=""nav-item dropdown pointer odjaviSe""><button type=""submit"" class=""nav-link"" style=""background-color: rgba(0,0,0,0); border:0px;"" >Odjavi se</button></li>
    </form>




</ul>

    
</div>

        
");
            }
            );
            WriteLiteral("\n");
            DefineSection("Script", async() => {
                WriteLiteral("\n");
                WriteLiteral("        <script src=\"source/mainAdmin.js\" type=\"module\"></script>\n\n");
            }
            );
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<adminModel> Html { get; private set; } = default!;
        #nullable disable
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<adminModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<adminModel>)PageContext?.ViewData;
        public adminModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591