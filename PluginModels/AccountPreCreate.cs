using Microsoft.Xrm.Sdk;
using System;
using System.ServiceModel;

namespace PluginModels
{
    public class AccountPreCreate : IPlugin
    {
        public AccountPreCreate() { }
        public AccountPreCreate(string unsecure) { }
        public AccountPreCreate(string unsecure, string secure) { }


        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            ITracingService tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            try
            {
                //logic goes here
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException("Erro ao executar o plugin AccountPreCreate.", ex);
            }
            catch (Exception ex)
            {
                tracing.Trace("AccountPreCreate: erro: {0}", ex.ToString());
            }
        }
    }
}
