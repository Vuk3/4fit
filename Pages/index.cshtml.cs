using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace _4fit.Pages
{
    
    public class indexModel : PageModel
    {
        public IActionResult OnGet()
        {
            if(User.Identity.IsAuthenticated){
                if(User.IsInRole("k") || User.IsInRole("t"))
                    return RedirectToPage("/prijavljen");
                else{
                    return RedirectToPage("/admin");
                }
            }
            return Page();
        }
    }
}
