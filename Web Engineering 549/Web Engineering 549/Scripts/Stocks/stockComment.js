$(document).ready(function () {
    $('#addComment').click(function () {
        $('#addCommentForm').show();
        $('#addComment').hide();
    });
    $('#editComment').click(function () {
        $('#editCommentForm').show();
        $('#editComment').hide();
        $('#commentText').val($('#commentP').text());
        $('#comment').hide();
    });
    $('#cancelAdd').click(function () {
        $('#addCommentForm').hide();
        $('#addComment').show();
    });
    $('#cancelEdit').click(function () {
        $('#editCommentForm').hide();
        $('#editComment').show();
        $('#comment').show();
    });
});