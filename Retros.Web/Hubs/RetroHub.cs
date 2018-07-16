using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.GetRetros;
using Retros.Web.Application;

namespace Retros.Web.Hubs
{
    public class RetroHub : Hub
    {
        readonly IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment;
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor;

        public RetroHub(
            IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment,
            IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor)
        {
            this.addComment = addComment;
            this.getRetroInteractor = getRetroInteractor;
        }

        public async Task JoinRetro(Guid retroId)
        {
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, retroId.ToString());
            var retros = await this.getRetroInteractor.Handle(new GetRetrosRequest());
            await this.Clients.Caller.SendAsync("ReceiveRetro", retros.Value.Retros.FirstOrDefault(r => r.Id == retroId));
        }

        public async Task AddComment(AddCommentRequest request)
        {
            var response = await addComment.Handle(request);
            await this.Clients.Group(request.RetroId.ToString())
                      .SendAsync("CommentAdded", new { comment = response.Value, groupId = request.GroupId});
        }
    }
}